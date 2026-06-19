import { QuizQuestion } from "@/components/aulas/shared";

export const QUIZ_LEI_13303: Record<string, QuizQuestion[]> = {
  "modulo-1": [
    {
      id: 101,
      pergunta:
        "A Lei 13.303/2016 disciplina o funcionamento de empresas públicas e de economia mista. Qual é o seu objetivo PRINCIPAL?",
      opcoes: [
        {
          label: "A",
          valor:
            "Substituir completamente a Lei 6.404/76 para todas as sociedades anônimas.",
        },
        {
          label: "B",
          valor:
            "Estabelecer regras de governança corporativa, garantindo eficiência, transparência e respeito aos acionistas em empresas estatais.",
        },
        {
          label: "C",
          valor:
            "Eliminar a necessidade de Conselho de Administração nas empresas públicas.",
        },
        {
          label: "D",
          valor: "Privatizar todas as empresas do setor público brasileiro.",
        },
        {
          label: "E",
          valor:
            "Impedir que acionistas privados participem de economia mista.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 estabelece normas específicas de governança para estatais: transparência, conformidade, responsabilidade. Petrobras segue rigorosamente estas normas.",
    },
    {
      id: 102,
      pergunta:
        "Qual é a diferença entre Empresa Pública e Economia Mista segundo a Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor:
            "Empresa Pública é privada; Economia Mista é controlada pelo governo.",
        },
        {
          label: "B",
          valor:
            "Empresa Pública: 100% governo. Economia Mista: governo tem controle, mas há acionistas privados.",
        },
        {
          label: "C",
          valor: "Ambas são idênticas; não há diferença legal.",
        },
        {
          label: "D",
          valor:
            "Empresa Pública não precisa cumprir Lei 13.303; apenas Economia Mista.",
        },
        {
          label: "E",
          valor: "Economia Mista nunca pode ter acionistas do governo.",
        },
      ],
      correta: "B",
      explicacao:
        "Petrobras é exemplo: empresa pública 100% União. Banco do Brasil é economia mista (maioria União, mas com acionistas privados). Ambas obedecem Lei 13.303.",
    },
    {
      id: 103,
      pergunta:
        "Os Artigos 28-91 da Lei 13.303 cobrem qual aspecto PRINCIPAL?",
      opcoes: [
        {
          label: "A",
          valor: "Regulação de preços de produtos das estatais.",
        },
        {
          label: "B",
          valor:
            "Órgãos de administração, responsabilidades, procedimentos, divulgação de informações e impedimentos.",
        },
        {
          label: "C",
          valor: "Autorização para privatização de empresas estatais.",
        },
        {
          label: "D",
          valor: "Restrições ao crescimento de empresas públicas.",
        },
        {
          label: "E",
          valor: "Eliminação de transparência em operações governamentais.",
        },
      ],
      correta: "B",
      explicacao:
        "Art. 28-91 disciplinam administração: Assembleia, Conselho, Diretoria, Conselho Fiscal. Definem responsabilidades, conflitos de interesse, divulgação de informações.",
    },
    {
      id: 104,
      pergunta:
        "A Lei 13.303 se aplica a quais entidades?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas empresa privadas de grande porte.",
        },
        {
          label: "B",
          valor:
            "Empresas públicas e economia mista federais, estaduais e municipais controladas pelo governo.",
        },
        {
          label: "C",
          valor: "Apenas universidades federais.",
        },
        {
          label: "D",
          valor: "Apenas bancos estaduais.",
        },
        {
          label: "E",
          valor: "Empresas privadas que recebem subsídios públicos.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 aplica-se a empresas públicas federais (como Petrobras, Correios), estaduais (como SABESP, CEDAE) e municipais, além de economia mista em qualquer nível.",
    },
    {
      id: 105,
      pergunta:
        "Qual é a relação entre Lei 13.303 e Lei 6.404/76?",
      opcoes: [
        {
          label: "A",
          valor: "Lei 13.303 revogou completamente Lei 6.404/76.",
        },
        {
          label: "B",
          valor:
            "Lei 13.303 é específica para estatais; Lei 6.404 é para S.A. privadas. Lei 13.303 complementa/modifica 6.404 para setor público.",
        },
        {
          label: "C",
          valor: "São idênticas em conteúdo e aplicação.",
        },
        {
          label: "D",
          valor:
            "Lei 6.404 prevalece sobre Lei 13.303 em caso de conflito.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 aplica apenas a startups, não a empresas estatais.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 6.404/76 é Lei das S.A. privadas. Lei 13.303/16 é específica para estatais, com normas mais rigorosas de governança, transparência e conformidade aplicáveis ao setor público.",
    },
    {
      id: 106,
      pergunta:
        "Qual PRINCÍPIO FUNDAMENTAL orienta Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor:
            "Maximizar lucro sem considerar responsabilidades sociais.",
        },
        {
          label: "B",
          valor:
            "Sustentabilidade (equilíbrio entre rentabilidade e responsabilidade), Governança (transparência) e Conformidade (obediência a leis).",
        },
        {
          label: "C",
          valor: "Restrição total ao acesso de informações públicas.",
        },
        {
          label: "D",
          valor: "Concentração de poder na Diretoria sem fiscalização.",
        },
        {
          label: "E",
          valor: "Eliminação de acionistas privados de economia mista.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 se baseia em 3 pilares: Sustentabilidade (retorno + responsabilidade), Governança (transparência e controle) e Conformidade (cumprimento de regulações). Petrobras exemplifica esses princípios.",
    },
    {
      id: 107,
      pergunta:
        "Segundo o Artigo 34 da Lei nº 13.303/2016 (Lei das Estatais), o valor estimado do contrato a ser licitado pela Petrobras possui qual regime de sigilo?",
      opcoes: [
        {
          label: "A",
          valor:
            "Deve ser obrigatoriamente divulgado no edital de licitação em todos os casos, sob pena de nulidade.",
        },
        {
          label: "B",
          valor:
            "Será preferencialmente sigiloso, sem prejuízo da divulgação do detalhamento dos quantitativos e das demais informações necessárias para a elaboração das propostas.",
        },
        {
          label: "C",
          valor:
            "É sempre mantido em sigilo absoluto, inclusive para os órgãos de controle externo e interno.",
        },
        {
          label: "D",
          valor:
            "Deve ser sigiloso apenas para os órgãos de controle, sendo público para todos os licitantes desde o início.",
        },
        {
          label: "E",
          valor:
            "Só poderá ser divulgado após a assinatura do contrato e o início de sua execução física.",
        },
      ],
      correta: "B",
      explicacao:
        "Nos termos do Art. 34 da Lei 13.303/16, o valor estimado do contrato terá caráter preferencialmente sigiloso, sendo obrigatório disponibilizar o detalhamento dos quantitativos. O sigilo não se aplica aos órgãos de controle (tribunais de contas). A CESGRANRIO costuma cobrar essa regra alegando que o sigilo é absoluto ou proibido.",
    },
  ],

  "modulo-2": [
    {
      id: 201,
      pergunta:
        "Qual definição MELHOR descreve uma Empresa Estatal segundo Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Qualquer empresa que tenha acionistas privados.",
        },
        {
          label: "B",
          valor:
            "Entidade criada para exercer atividade econômica, com patrimônio pertencente à União, Estados ou Municípios, sob controle estatal.",
        },
        {
          label: "C",
          valor: "Uma cooperativa de trabalhadores do setor público.",
        },
        {
          label: "D",
          valor:
            "Organização não-governamental que recebe financiamento público.",
        },
        {
          label: "E",
          valor: "Uma filial de empresa estrangeira com sócio brasileiro.",
        },
      ],
      correta: "B",
      explicacao:
        "Empresa Estatal é entidade de economia mista ou empresa pública que exerce atividade econômica. Petrobras é modelo: empresa pública que atua em exploração de petróleo, refino e distribuição.",
    },
    {
      id: 202,
      pergunta:
        "Qual tipo de atividade econômica uma Empresa Estatal pode exercer segundo Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas atividades deficitárias que o setor privado não quer.",
        },
        {
          label: "B",
          valor:
            "Atividades que contribuam para desenvolvimento nacional ou bem-estar da população.",
        },
        {
          label: "C",
          valor: "Apenas educação e saúde; não pode exercer atividades industriais.",
        },
        {
          label: "D",
          valor: "Qualquer atividade, sem limite ou justificativa.",
        },
        {
          label: "E",
          valor: "Apenas atividades que lucram, nunca as não-lucrativas.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 permite que empresa estatal exerça atividades que contribuam para desenvolvimento nacional, bem-estar social, segurança energética. Petrobras exemplifica: energia (essencial ao desenvolvimento).",
    },
    {
      id: 203,
      pergunta:
        "Como é constituída uma Empresa Estatal em termos de capital social?",
      opcoes: [
        {
          label: "A",
          valor: "100% de acionistas privados investindo em projeto público.",
        },
        {
          label: "B",
          valor:
            "Capital social dividido em ações, com controle acionário na mão do governo (União, Estado ou Município).",
        },
        {
          label: "C",
          valor: "Sem divisão em ações; apenas patrimônio governamental.",
        },
        {
          label: "D",
          valor: "Capital social doado apenas por entidades filantrópicas.",
        },
        {
          label: "E",
          valor: "Através de empréstimos internacionais sem patrimônio próprio.",
        },
      ],
      correta: "B",
      explicacao:
        "Empresa Estatal é constituída com capital social em ações. Governo (União/Estado/Município) tem controle acionário (maioria). Pode haver acionistas privados em economia mista.",
    },
    {
      id: 204,
      pergunta:
        "Qual é o significado de 'controle acionário' em uma Empresa Estatal?",
      opcoes: [
        {
          label: "A",
          valor:
            "Posse de apenas 1 ação, mesmo que não seja maioria.",
        },
        {
          label: "B",
          valor:
            "Capacidade de eleger a maioria dos membros do Conselho de Administração e Diretoria, orientando decisões estratégicas.",
        },
        {
          label: "C",
          valor: "Direito de veto absoluto em qualquer decisão.",
        },
        {
          label: "D",
          valor: "Participação minoritária com voz consultiva apenas.",
        },
        {
          label: "E",
          valor: "Propriedade de instalações, sem participação em decisões.",
        },
      ],
      correta: "B",
      explicacao:
        "Controle acionário significa poder de decisão: eleição da maioria dos conselheiros, direcionamento estratégico. Petrobras: União mantém controle mesmo com acionistas privados (ações ordinárias vs preferenciais).",
    },
    {
      id: 205,
      pergunta:
        "Uma Economia Mista pode ter acionistas privados?",
      opcoes: [
        {
          label: "A",
          valor: "Não, por definição não pode ter acionistas privados.",
        },
        {
          label: "B",
          valor:
            "Sim, pode ter acionistas privados, mas o governo mantém controle acionário (maioria).",
        },
        {
          label: "C",
          valor: "Sim, acionistas privados podem ter até 80% das ações.",
        },
        {
          label: "D",
          valor:
            "Apenas se os acionistas privados forem estatais de outro país.",
        },
        {
          label: "E",
          valor:
            "Economia Mista é sinônimo de Empresa Pública; não há diferença.",
        },
      ],
      correta: "B",
      explicacao:
        "Economia Mista tem acionistas privados E governo. Governo mantém controle (maioria absoluta). Exemplo: Banco do Brasil (70% União, 30% mercado).",
    },
    {
      id: 206,
      pergunta:
        "Qual é a diferença entre Empresa Pública e Economia Mista na prática?",
      opcoes: [
        {
          label: "A",
          valor:
            "Empresa Pública é menor; Economia Mista é maior.",
        },
        {
          label: "B",
          valor:
            "Empresa Pública: 100% governo. Economia Mista: governo + acionistas privados (com controle governamental).",
        },
        {
          label: "C",
          valor:
            "Empresa Pública não precisa lucrar; Economia Mista precisa.",
        },
        {
          label: "D",
          valor:
            "Economia Mista tem Conselho Fiscal; Empresa Pública não.",
        },
        {
          label: "E",
          valor: "Não há diferença prática entre elas.",
        },
      ],
      correta: "B",
      explicacao:
        "Diferença essencial: composição acionária. Petrobras (empresa pública) vs Banco do Brasil (economia mista). Ambas obedecem Lei 13.303, mas estrutura acionária difere.",
    },
  ],

  "modulo-3": [
    {
      id: 301,
      pergunta:
        "Segundo Lei 13.303, qual é o direito PRINCIPAL de um acionista em Empresa Estatal?",
      opcoes: [
        {
          label: "A",
          valor: "Aprovar pessoalmente todos os contratos da empresa.",
        },
        {
          label: "B",
          valor:
            "Participar de Assembleia Geral, votar, receber dividendos conforme participação acionária.",
        },
        {
          label: "C",
          valor: "Garantia de emprego na empresa para familiares.",
        },
        {
          label: "D",
          valor: "Direito de modificar unilateralmente a estratégia da empresa.",
        },
        {
          label: "E",
          valor:
            "Isenção de impostos por investir em empresa estatal.",
        },
      ],
      correta: "B",
      explicacao:
        "Direitos acionistas: participar de decisões na Assembleia Geral, votar em eleições de conselheiros, receber dividendos proporcionais. Lei 13.303 garante esses direitos.",
    },
    {
      id: 302,
      pergunta:
        "Qual é o dever PRINCIPAL de um acionista conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Trabalhar na empresa sem receber salário.",
        },
        {
          label: "B",
          valor:
            "Exercer direitos e poderes de modo responsável, sem prejudicar empresa ou outros acionistas.",
        },
        {
          label: "C",
          valor: "Manter sigilo total de todas as operações da empresa.",
        },
        {
          label: "D",
          valor:
            "Rejeitar qualquer lucro ou dividendo que a empresa gerar.",
        },
        {
          label: "E",
          valor:
            "Vender suas ações dentro de 6 meses obrigatoriamente.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: acionista deve exercer direitos de forma responsável, sem abuso, respeitando outros acionistas e interesse da empresa. Não prejudicar com atos de má-fé.",
    },
    {
      id: 303,
      pergunta:
        "Qual informação acionista tem DIREITO de acessar em Empresa Estatal?",
      opcoes: [
        {
          label: "A",
          valor: "Nenhuma; informações são sigilosas mesmo para acionistas.",
        },
        {
          label: "B",
          valor:
            "Demonstrações financeiras, relatórios de administração, informações sobre reuniões de órgãos sociais, conforme Lei 13.303.",
        },
        {
          label: "C",
          valor:
            "Apenas lucros; despesas não são divulgadas.",
        },
        {
          label: "D",
          valor:
            "Informações classificadas como secreto de defesa nacional, mas nada mais.",
        },
        {
          label: "E",
          valor:
            "Salários individuais de todos os funcionários da empresa.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 exige transparência: divulgação de demonstrações financeiras, relatórios, atas de assembleias e reuniões de órgãos. Petrobras publica extensa documentação anualmente.",
    },
    {
      id: 304,
      pergunta:
        "Um acionista pode ser impedido de votar em Assembleia Geral conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Nunca; todo acionista tem direito de voto garantido.",
        },
        {
          label: "B",
          valor:
            "Sim, se estiver em conflito de interesse na matéria em votação, ou se descumprir deveres impostos.",
        },
        {
          label: "C",
          valor:
            "Sim, apenas se tiver ações preferenciais (sem direito de voto).",
        },
        {
          label: "D",
          valor:
            "Apenas acionistas privados podem votar; governo nunca.",
        },
        {
          label: "E",
          valor:
            "Acionista que questiona decisões é sempre impedido de votar.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: acionista com conflito de interesse em matéria específica não vota (evita abuso). Acionista que descumpre deveres pode ter direitos limitados. Governança responsável.",
    },
    {
      id: 305,
      pergunta:
        "Qual é o conceito de 'conflito de interesse' para acionista conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Quando o acionista discorda da administração.",
        },
        {
          label: "B",
          valor:
            "Situação onde decisão do acionista beneficia-o de forma desproporcionada, prejudicando empresa ou outros acionistas.",
        },
        {
          label: "C",
          valor: "Quando acionista investe em outra empresa também.",
        },
        {
          label: "D",
          valor:
            "Quando acionista faz perguntas sobre operações da empresa.",
        },
        {
          label: "E",
          valor: "Nunca existe conflito de interesse em empresa estatal.",
        },
      ],
      correta: "B",
      explicacao:
        "Conflito de interesse: quando acionista (ou administrador) tem interesse pessoal em decisão que afeta empresa. Lei 13.303 obriga divulgação e abstenção de voto nesses casos.",
    },
    {
      id: 306,
      pergunta:
        "Se um acionista sofrer dano por atos ilícitos de administrador, que direito tem conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Nenhum; acionistas não podem processar administradores.",
        },
        {
          label: "B",
          valor:
            "Direito de requerer indenização à empresa pelos danos causados por administrador negligente ou infrator.",
        },
        {
          label: "C",
          valor:
            "Apenas empresa pode processar, não o acionista pessoalmente.",
        },
        {
          label: "D",
          valor:
            "Acionista perdeu direito ao aceitar integralizar ações.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 proíbe qualquer responsabilização de administrador.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 permite ação de acionistas contra administradores que agiram com negligência, dolo ou violação de lei. Acionista pode requerer reparação de danos patrimoniais.",
    },
  ],

  "modulo-4": [
    {
      id: 401,
      pergunta:
        "Quantos órgãos de governança PRINCIPAIS uma Empresa Estatal deve ter conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Um único órgão (Diretoria Geral).",
        },
        {
          label: "B",
          valor:
            "Três: Assembleia Geral de Acionistas, Conselho de Administração e Diretoria.",
        },
        {
          label: "C",
          valor: "Apenas Conselho e Diretoria; Assembleia é opcional.",
        },
        {
          label: "D",
          valor: "Cinco: Assembleia, Conselho, Diretoria, Conselho Fiscal e Auditoria.",
        },
        {
          label: "E",
          valor: "Lei 13.303 não define órgãos; cada empresa decide.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: 3 órgãos obrigatórios: Assembleia Geral (decisões máximas), Conselho de Administração (governance), Diretoria (execução). Conselho Fiscal é opcional mas recomendado.",
    },
    {
      id: 402,
      pergunta:
        "Qual é a função PRINCIPAL da Assembleia Geral de Acionistas?",
      opcoes: [
        {
          label: "A",
          valor: "Executar operações diárias da empresa.",
        },
        {
          label: "B",
          valor:
            "Deliberar sobre matérias de competência exclusiva: eleição de conselheiros, aprovação de contas, distribuição de lucros.",
        },
        {
          label: "C",
          valor: "Aprovar cada contrato que a empresa faz.",
        },
        {
          label: "D",
          valor: "Definir salários de todos os funcionários.",
        },
        {
          label: "E",
          valor: "Supervisionar operações em tempo real.",
        },
      ],
      correta: "B",
      explicacao:
        "Assembleia: órgão soberano dos acionistas. Elegem conselheiros, aprovam contas (demonstrações financeiras), definem distribuição de dividendos, votam em matérias estratégicas.",
    },
    {
      id: 403,
      pergunta:
        "Qual é a composição típica do Conselho de Administração em Empresa Estatal?",
      opcoes: [
        {
          label: "A",
          valor:
            "Um único presidente nomeado pelo governo sem participação de acionistas.",
        },
        {
          label: "B",
          valor:
            "Múltiplos conselheiros eleitos em Assembleia Geral, representando acionistas (governo e privados), independentes e internos.",
        },
        {
          label: "C",
          valor: "Apenas diretores executivos; não há conselheiros.",
        },
        {
          label: "D",
          valor: "Exclusivamente acionistas privados, sem representante do governo.",
        },
        {
          label: "E",
          valor: "Conselheiros nomeados pelo Presidente da República sem votação.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: Conselho elegido democraticamente em Assembleia. Pode incluir: conselheiros independentes (sem conflito), conselheiros de acionistas, representantes. Petrobras exemplifica composição equilibrada.",
    },
    {
      id: 404,
      pergunta:
        "Qual é a função do Conselho Fiscal em Empresa Estatal?",
      opcoes: [
        {
          label: "A",
          valor: "Executar operações e assinar contratos da empresa.",
        },
        {
          label: "B",
          valor:
            "Fiscalizar atos de administradores, examinar demonstrações financeiras, verificar conformidade com leis.",
        },
        {
          label: "C",
          valor: "Eleger novos conselheiros de administração.",
        },
        {
          label: "D",
          valor: "Definir salários de executivos.",
        },
        {
          label: "E",
          valor: "Substituir permanentemente o Conselho de Administração.",
        },
      ],
      correta: "B",
      explicacao:
        "Conselho Fiscal: órgão de supervisão/controle. Examina contas, relatórios, atos de administradores. Verifica legalidade e legitimidade. Papel essencial em governance corporativa.",
    },
    {
      id: 405,
      pergunta:
        "Qual órgão tem responsabilidade DIRETA pela execução das operações da empresa?",
      opcoes: [
        {
          label: "A",
          valor: "Assembleia Geral.",
        },
        {
          label: "B",
          valor: "Conselho de Administração.",
        },
        {
          label: "C",
          valor: "Diretoria Executiva.",
        },
        {
          label: "D",
          valor: "Conselho Fiscal.",
        },
        {
          label: "E",
          valor: "Acionistas privados individualmente.",
        },
      ],
      correta: "C",
      explicacao:
        "Diretoria executa: operações diárias, implementa estratégias aprovadas pelo Conselho e Assembleia. Presidente/Diretores são responsáveis perante Conselho e Assembleia.",
    },
    {
      id: 406,
      pergunta:
        "Conforme Lei 13.303, qual órgão é responsável por APROVAR a estratégia da empresa?",
      opcoes: [
        {
          label: "A",
          valor: "Conselho Fiscal.",
        },
        {
          label: "B",
          valor: "Diretoria Executiva (sem aprovação).",
        },
        {
          label: "C",
          valor:
            "Conselho de Administração, fiscalizado por Assembleia Geral.",
        },
        {
          label: "D",
          valor: "Apenas acionistas privados podem aprovar.",
        },
        {
          label: "E",
          valor: "Governo unilateralmente, sem consulta.",
        },
      ],
      correta: "C",
      explicacao:
        "Conselho de Administração aprova estratégia e monitora execução. Assembleia aprova contas e matérias críticas. Sistema de pesos e contrapesos garante governança responsável.",
    },
  ],

  "modulo-5": [
    {
      id: 501,
      pergunta:
        "Qual é a frequência MÍNIMA de reuniões da Assembleia Geral conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Mensalmente.",
        },
        {
          label: "B",
          valor: "Trimestralmente.",
        },
        {
          label: "C",
          valor: "Uma vez por ano (obrigatória) + extraordinárias quando necessário.",
        },
        {
          label: "D",
          valor: "Raramente; pode ficar anos sem se reunir.",
        },
        {
          label: "E",
          valor: "Lei 13.303 não exige nenhuma reunião específica.",
        },
      ],
      correta: "C",
      explicacao:
        "Lei 13.303: Assembleia ordinária anual (até 120 dias após encerramento do exercício) para aprova de contas. Assembleias extraordinárias conforme necessidade. Transparência obrigatória.",
    },
    {
      id: 502,
      pergunta:
        "Qual matéria é de COMPETÊNCIA EXCLUSIVA da Assembleia Geral?",
      opcoes: [
        {
          label: "A",
          valor: "Decisões operacionais do dia a dia.",
        },
        {
          label: "B",
          valor:
            "Eleição de conselheiros, aprovação de contas, distribuição de lucros, alteração de estatuto.",
        },
        {
          label: "C",
          valor: "Contratação de novos funcionários.",
        },
        {
          label: "D",
          valor: "Definição de preços de produtos.",
        },
        {
          label: "E",
          valor:
            "Assinatura de contratos de fornecimento com terceiros.",
        },
      ],
      correta: "B",
      explicacao:
        "Competência exclusiva Assembleia: elegem conselheiros em votação democrática, aprovam/rejeitam contas anuais, decidem sobre distribuição de dividendos, modificam estatuto, decidem em conflitos graves.",
    },
    {
      id: 503,
      pergunta:
        "Como é garantida a democracia nas votações da Assembleia Geral?",
      opcoes: [
        {
          label: "A",
          valor: "Um acionista = um voto, independente de quantas ações tem.",
        },
        {
          label: "B",
          valor:
            "Número de votos proporcional ao número de ações (ações ordinárias = direito de voto).",
        },
        {
          label: "C",
          valor: "Maioria absoluta de acionistas presente decide, independente de ações.",
        },
        {
          label: "D",
          valor:
            "Governo tem direito de veto em qualquer decisão.",
        },
        {
          label: "E",
          valor: "Acionistas privados nunca podem votar em assembleias.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: cada ação ordinária = 1 voto. Proporcionalidade garante que maior acionista (governo) tem maior poder de voto, mas minoritários também têm representação.",
    },
    {
      id: 504,
      pergunta:
        "Um acionista pode participar de Assembleia remotamente conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Não; Lei 13.303 obriga presença física.",
        },
        {
          label: "B",
          valor:
            "Sim; Lei 13.303 permite participação remota e voto por procuração para garantir acessibilidade.",
        },
        {
          label: "C",
          valor: "Apenas acionistas governamentais; privados devem estar presentes.",
        },
        {
          label: "D",
          valor:
            "Pode participar remotamente, mas não pode votar.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 não prevê isso; deixa a critério de cada empresa.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: Assembleia deve permitir participação remota (teleconferência, videoconferência). Acionista pode votar por procuração. Petrobras realiza assembleias transmitidas ao vivo.",
    },
    {
      id: 505,
      pergunta:
        "Como as atas de Assembleia são tratadas conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Mantidas em sigilo total.",
        },
        {
          label: "B",
          valor:
            "Publicadas e divulgadas aos acionistas conforme Lei 13.303. Transcrições de votos, deliberações, materiais apresentados registrados.",
        },
        {
          label: "C",
          valor: "Divulgadas apenas ao governo.",
        },
        {
          label: "D",
          valor: "Divulgadas apenas se houver lucro.",
        },
        {
          label: "E",
          valor: "Lei 13.303 não exige publicação de atas.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: transparência obrigatória. Atas, votos, deliberações, pareceres devem ser publicados e disponibilizados aos acionistas. Petrobras publica tudo em site de governança.",
    },
    {
      id: 506,
      pergunta:
        "Qual é a consequência se deliberação de Assembleia Geral violar Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Nenhuma; Assembleia é soberana e não pode ser questionada.",
        },
        {
          label: "B",
          valor:
            "Acionista ou terceiro prejudicado pode contestar judicialmente. Decisão nula conforme Lei 13.303.",
        },
        {
          label: "C",
          valor: "Apenas governo pode contestar, não acionistas privados.",
        },
        {
          label: "D",
          valor: "Viola Lei Civil, mas não Lei 13.303.",
        },
        {
          label: "E",
          valor:
            "Empresa é automaticamente dissolvida.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: decisões que violam lei podem ser anuladas em ação judicial. Qualquer acionista (ou terceiro prejudicado) pode requerer nulidade. Limite: prazo de prescrição.",
    },
  ],

  "modulo-6": [
    {
      id: 601,
      pergunta:
        "Qual é o papel PRINCIPAL do Conselho de Administração em Empresa Estatal?",
      opcoes: [
        {
          label: "A",
          valor: "Executar todas as operações da empresa diariamente.",
        },
        {
          label: "B",
          valor:
            "Definir estratégia, supervisionar Diretoria, garantir conformidade com Lei 13.303 e melhor interesse da empresa.",
        },
        {
          label: "C",
          valor:
            "Aprovar cada transação de compra ou venda da empresa.",
        },
        {
          label: "D",
          valor: "Substituir Diretoria em qualquer momento.",
        },
        {
          label: "E",
          valor: "Executar operações financeiras diretas.",
        },
      ],
      correta: "B",
      explicacao:
        "Conselho define política estratégica, supervisiona Diretoria, verifica conformidade. Funciona como 'board': governança corporativa. Petrobras: Conselho com ~13 membros eleitos em Assembleia.",
    },
    {
      id: 602,
      pergunta:
        "Quantos conselheiros MÍNIMOS deve ter o Conselho de Administração conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Um único presidente.",
        },
        {
          label: "B",
          valor: "Três conselheiros no mínimo.",
        },
        {
          label: "C",
          valor: "Cinco conselheiros no mínimo.",
        },
        {
          label: "D",
          valor: "Número é definido unilateralmente pelo governo.",
        },
        {
          label: "E",
          valor: "Lei 13.303 não estabelece número mínimo.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: mínimo 3 conselheiros. Número maior garante diversidade de visões. Petrobras tem mais conselheiros para melhor governance em empresa de grande porte.",
    },
    {
      id: 603,
      pergunta:
        "Como são eleitos os membros do Conselho de Administração conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor:
            "Nomeados unilateralmente pelo Presidente da República.",
        },
        {
          label: "B",
          valor:
            "Eleitos democraticamente na Assembleia Geral de Acionistas, em votação proporcional à participação acionária.",
        },
        {
          label: "C",
          valor: "Selecionados por agência pública específica.",
        },
        {
          label: "D",
          valor: "Herdados da administração anterior.",
        },
        {
          label: "E",
          valor:
            "Sorteados entre funcionários da empresa.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: eleição democrática em Assembleia. Cada acionista vota em conselheiros que representa seus interesses. Governo (maior acionista) elege maioria; privados, minoria. Transparência obrigatória.",
    },
    {
      id: 604,
      pergunta:
        "Qual requisito Lei 13.303 impõe para um conselheiro independente?",
      opcoes: [
        {
          label: "A",
          valor:
            "Deve ser funcionário da empresa há mais de 10 anos.",
        },
        {
          label: "B",
          valor:
            "Não pode ter relações de negócio, parentesco ou dependência financeira com empresa ou acionistas controladores.",
        },
        {
          label: "C",
          valor: "Deve ser membro da família do Presidente.",
        },
        {
          label: "D",
          valor:
            "Deve ser aposentado do governo.",
        },
        {
          label: "E",
          valor: "Lei 13.303 não prevê conselheiros independentes.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 estimula conselheiros independentes: sem conflitos de interesse. Trazem expertise externa, visão objetiva, reduzem vieses. Petrobras inclui independentes para melhorar governance.",
    },
    {
      id: 605,
      pergunta:
        "Como um administrador responsabilizado por ato negligente conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Nunca; administradores têm imunidade.",
        },
        {
          label: "B",
          valor:
            "Pessoalmente responsável por danos à empresa. Conselho pode suspender, processar judicialmente, requerer indenização.",
        },
        {
          label: "C",
          valor:
            "Apenas a empresa é responsável; administrador não.",
        },
        {
          label: "D",
          valor: "Governo assume responsabilidade automaticamente.",
        },
        {
          label: "E",
          valor: "Responsabilidade prescrita após 1 ano.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: responsabilidade pessoal. Administrador que agir com negligência, dolo ou violação de lei responde perante empresa e acionistas. Petrobras pode processar conselheiros/diretores infratores.",
    },
    {
      id: 606,
      pergunta:
        "Qual é a duração típica do mandato de um conselheiro conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Cargo vitalício.",
        },
        {
          label: "B",
          valor:
            "Um a três anos, conforme estatuto (renovável), permitindo rotatividade e novas eleições.",
        },
        {
          label: "C",
          valor: "Seis meses apenas.",
        },
        {
          label: "D",
          valor:
            "Indefinido até morte ou renúncia.",
        },
        {
          label: "E",
          valor: "Lei 13.303 não especifica duração de mandato.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: mandatos de 1-3 anos permitem renovação periódica. Garante oportunidade de novas eleições, reduz risco de perpetuação, melhora representatividade. Petrobras: mandato de ~2 anos.",
    },
  ],

  "modulo-7": [
    {
      id: 701,
      pergunta:
        "Qual é a responsabilidade PRINCIPAL da Diretoria Executiva conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor:
            "Supervisionar o Conselho de Administração.",
        },
        {
          label: "B",
          valor:
            "Executar estratégia aprovada pelo Conselho, gerir operações, responder perante Conselho e acionistas.",
        },
        {
          label: "C",
          valor: "Eleger novos conselheiros.",
        },
        {
          label: "D",
          valor: "Modificar estatuto da empresa.",
        },
        {
          label: "E",
          valor:
            "Aprovar relatórios do Conselho Fiscal.",
        },
      ],
      correta: "B",
      explicacao:
        "Diretoria: órgão executivo. Implementa decisões do Conselho, gerencia dia a dia, reporta resultados. Presidente é principal executivo. Responde por violações à Lei 13.303.",
    },
    {
      id: 702,
      pergunta:
        "Qual é o papel específico do Presidente/Diretor Presidente conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Representante exclusivo da Assembleia.",
        },
        {
          label: "B",
          valor:
            "Representante da empresa perante terceiros, responsável pela execução estratégica, coordena Diretoria, reporta ao Conselho.",
        },
        {
          label: "C",
          valor: "Apenas assina documentos, sem responsabilidade executi va.",
        },
        {
          label: "D",
          valor: "Substitui o Conselho em caso de conflito.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 não define papel específico do Presidente.",
        },
      ],
      correta: "B",
      explicacao:
        "Presidente/Diretor Presidente: principal executivo. Representa empresa, coordena Diretoria, implementa políticas do Conselho, presta contas em Assembleia. Responsabilidade pessoal por atos ilícitos.",
    },
    {
      id: 703,
      pergunta:
        "Qual matéria pode ser delegada pela Diretoria a outros funcionários?",
      opcoes: [
        {
          label: "A",
          valor:
            "Nenhuma; Diretoria deve executar tudo pessoalmente.",
        },
        {
          label: "B",
          valor:
            "Operações rotineiras podem ser delegadas, mas decisões estratégicas e conformidade permanecem com Diretoria.",
        },
        {
          label: "C",
          valor:
            "Todas as funções podem ser completamente delegadas.",
        },
        {
          label: "D",
          valor:
            "Apenas responsabilidade criminal pode ser delegada.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 proíbe qualquer delegação.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: Diretoria pode delegar operações, mas mantém responsabilidade. Estratégia, governança, conformidade NÃO são delegáveis. Diretoria responde por atos de delegados.",
    },
    {
      id: 704,
      pergunta:
        "Como é garantido accountability da Diretoria conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Nenhum; Diretoria é independente.",
        },
        {
          label: "B",
          valor:
            "Reporta ao Conselho, presta contas em Assembleia, fiscalizada por Conselho Fiscal, responde judicialmente por violações.",
        },
        {
          label: "C",
          valor:
            "Apenas governo supervisiona Diretoria.",
        },
        {
          label: "D",
          valor:
            "Acionistas não podem questionar Diretoria.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 não prevê supervisão de Diretoria.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: múltiplas camadas de accountability. Conselho supervisiona (aprovação/rejeição de atos), Assembleia aprova contas, Conselho Fiscal inspeciona, justiça verifica violações. Sistema de checks and balances.",
    },
    {
      id: 705,
      pergunta:
        "Qual é o papel específico do Conselho Fiscal em Empresa Estatal?",
      opcoes: [
        {
          label: "A",
          valor:
            "Executar operações financeiras.",
        },
        {
          label: "B",
          valor:
            "Fiscalizar atos de administradores, examinar demonstrações financeiras, auditar conformidade, reportar à Assembleia.",
        },
        {
          label: "C",
          valor: "Eleger novos diretores.",
        },
        {
          label: "D",
          valor:
            "Aprovar contratos da empresa.",
        },
        {
          label: "E",
          valor:
            "Apenas aconselhar informalmente, sem autoridade.",
        },
      ],
      correta: "B",
      explicacao:
        "Conselho Fiscal: órgão de fiscalização/auditoria interna. Examina contas, verifica legal..",
    },
    {
      id: 706,
      pergunta:
        "Se Conselho Fiscal identifica irregularidade de administrador, que deve fazer?",
      opcoes: [
        {
          label: "A",
          valor: "Nada; apenas documentar para arquivo.",
        },
        {
          label: "B",
          valor:
            "Reportar à Assembleia Geral, Conselho de Administração e/ou órgãos competentes (Ministério Público, Polícia).",
        },
        {
          label: "C",
          valor:
            "Punir administrador por conta própria.",
        },
        {
          label: "D",
          valor:
            "Informar apenas ao governo, não aos acionistas.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 não obriga denúncia.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: Conselho Fiscal obrigado a reportar irregularidades. Transparência e conformidade são princípios. Pode denunciar a órgãos públicos se necessário (whistleblower).",
    },
  ],

  "modulo-8": [
    {
      id: 801,
      pergunta:
        "Qual é a definição de 'conflito de interesse' conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Qualquer desacordo entre administrador e acionistas.",
        },
        {
          label: "B",
          valor:
            "Situação em que administrador tem interesse pessoal/familiar que conflita com dever para com empresa.",
        },
        {
          label: "C",
          valor: "Quando administrador trabalha em mais de uma empresa.",
        },
        {
          label: "D",
          valor: "Não existe conflito de interesse em empresa estatal.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 não define conflito de interesse.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: conflito de interesse é situação onde dever profissional entra em conflito com interesse pessoal/familiar. Ex: conselheiro votando em contrato com sua própria empresa.",
    },
    {
      id: 802,
      pergunta:
        "O que administrador deve fazer quando tem conflito de interesse conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Ignorar e participar normalmente da votação.",
        },
        {
          label: "B",
          valor:
            "Revelar conflito, se abster de votar/participar, deixar ata registrada.",
        },
        {
          label: "C",
          valor:
            "Apenas informar informalmente a colega.",
        },
        {
          label: "D",
          valor:
            "Renunciar imediatamente ao cargo.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 não exige nenhuma ação.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: obrigação de divulgação (disclosure). Administrador com conflito DEVE revelar, abster-se de votar/deliberar, deixar registrado em ata. Petrobras tem política rigorosa de conflitos.",
    },
    {
      id: 803,
      pergunta:
        "Qual é a consequência se administrador vota em matéria com conflito de interesse?",
      opcoes: [
        {
          label: "A",
          valor: "Nenhuma; seu voto é válido.",
        },
        {
          label: "B",
          valor:
            "Voto é nulo, decisão pode ser anulada, administrador responde por negligência/violação Lei 13.303.",
        },
        {
          label: "C",
          valor:
            "Empresa é obrigada a cumprir o que foi votado.",
        },
        {
          label: "D",
          valor:
            "Apenas governo pode questionar o voto.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 permite voto mesmo com conflito.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: voto em conflito é nulo. Decisão pode ser anulada judicialmente. Administrador que votou responde por violação de dever legal. Protege integridade de decisões corporativas.",
    },
    {
      id: 804,
      pergunta:
        "Qual é a regra sobre transações entre administrador e empresa conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Completamente proibidas.",
        },
        {
          label: "B",
          valor:
            "Permitidas se aprovadas por órgão competente (Conselho/Assembleia), divulgadas, e feitas em condições de mercado justas.",
        },
        {
          label: "C",
          valor:
            "Permitidas sem qualquer aprovação prévia.",
        },
        {
          label: "D",
          valor:
            "Só permitidas para acionistas governamentais.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 não regula transações de administrador.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: transações relacionadas (related-party) permitidas, mas com controle: aprovação prévia, divulgação, condições de mercado. Evita auto-favorecimento. Auditoria interna verifica.",
    },
    {
      id: 805,
      pergunta:
        "Como empresa deve divulgar conflitos de interesse conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Não precisa divulgar.",
        },
        {
          label: "B",
          valor:
            "Divulgar em atas de reuniões, relatórios, demonstrações financeiras conforme transparência obrigatória.",
        },
        {
          label: "C",
          valor:
            "Apenas informar governo em sigilo.",
        },
        {
          label: "D",
          valor:
            "Apenas divulgar se conflito resultar em prejuízo.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 proíbe divulgação de conflitos.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: transparência obrigatória. Conflitos devem constar em atas, relatórios disponibilizados aos acionistas. Petrobras divulga transações relacionadas em demonstrações financeiras auditadas.",
    },
    {
      id: 806,
      pergunta:
        "Qual órgão é responsável por resolver conflitos entre acionistas/administradores conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Assembleia Geral resolve (se tiver em competência) ou Poder Judiciário.",
        },
        {
          label: "B",
          valor: "Apenas órgãos governamentais.",
        },
        {
          label: "C",
          valor: "Não há mecanismo de resolução.",
        },
        {
          label: "D",
          valor: "Conselho Fiscal resolve com poder de veto.",
        },
        {
          label: "E",
          valor: "Lei 13.303 proíbe resolução de conflitos.",
        },
      ],
      correta: "A",
      explicacao:
        "Lei 13.303: Assembleia resolve conflitos em sua competência (eleições, contas, distribuição lucros). Conflitos sobre legalidade/constitucionalidade vão para Poder Judiciário. Petrobras: mediação interna antes de judicialização.",
    },
  ],

  "modulo-9": [
    {
      id: 901,
      pergunta:
        "Como Lei 13.303 é aplicada em contexto ESPECÍFICO da Petrobras?",
      opcoes: [
        {
          label: "A",
          valor:
            "Petrobras não precisa cumprir Lei 13.303.",
        },
        {
          label: "B",
          valor:
            "Petrobras (empresa pública federal) segue rigorosamente Lei 13.303 em governança, estrutura de órgãos sociais, divulgação de informações.",
        },
        {
          label: "C",
          valor:
            "Apenas parcialmente; particularidades de petróleo justificam exceções.",
        },
        {
          label: "D",
          valor:
            "Lei 13.303 é supletiva; Petrobras pode ignorar.",
        },
        {
          label: "E",
          valor:
            "Petrobras tem Lei própria que substitui Lei 13.303.",
        },
      ],
      correta: "B",
      explicacao:
        "Petrobras é empresa pública federal que cumpre Lei 13.303. Tem Assembleia Geral, Conselho de Administração eleito democraticamente, Diretoria, Conselho Fiscal. Exemplar em governança corporativa.",
    },
    {
      id: 902,
      pergunta:
        "Qual é a composição do Conselho de Administração da Petrobras conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor:
            "Apenas nomeados pelo Presidente da República.",
        },
        {
          label: "B",
          valor:
            "Eleitos em Assembleia Geral: conselheiros pelo governo (maioria), acionistas privados (minoria), independentes, funcionário.",
        },
        {
          label: "C",
          valor: "Apenas funcionários internos.",
        },
        {
          label: "D",
          valor:
            "Governo e agências reguladoras.",
        },
        {
          label: "E",
          valor:
            "Somente homens de confiança do Presidente.",
        },
      ],
      correta: "B",
      explicacao:
        "Conselho Petrobras: ~13 conselheiros eleitos em Assembleia. Incluem: gov, acionistas (ações preferenciais), independentes com expertise. Transparência rigorosa em votação.",
    },
    {
      id: 903,
      pergunta:
        "Como Petrobras divulga informações sobre governança conforme Lei 13.303?",
      opcoes: [
        {
          label: "A",
          valor: "Não divulga; é sigiloso.",
        },
        {
          label: "B",
          valor:
            "Divulga em site de governança, relatórios anuais, demonstrações financeiras auditadas, atas de Assembleia e Conselho.",
        },
        {
          label: "C",
          valor:
            "Apenas para órgãos governamentais.",
        },
        {
          label: "D",
          valor:
            "Divulga apenas lucros, não estrutura.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 não exige divulgação de Petrobras.",
        },
      ],
      correta: "B",
      explicacao:
        "Petrobras: modelo de transparência. Site dedicado a governança, publica relatórios anuais em português/inglês, atas de Assembleia, código de conduta, políticas de conflito interesse.",
    },
    {
      id: 904,
      pergunta:
        "Qual desafio Petrobras enfrenta ao aplicar Lei 13.303 como empresa de energia?",
      opcoes: [
        {
          label: "A",
          valor:
            "Nenhum; Lei 13.303 é irrelevante para setor de energia.",
        },
        {
          label: "B",
          valor:
            "Balancear interesse público (energia estratégica para país) com governança corporativa e retorno a acionistas.",
        },
        {
          label: "C",
          valor:
            "Lei 13.303 proíbe operações de petróleo.",
        },
        {
          label: "D",
          valor:
            "Petrobras ignora Lei 13.303 por pressão do governo.",
        },
        {
          label: "E",
          valor:
            "Não há desafios; tudo é simples.",
        },
      ],
      correta: "B",
      explicacao:
        "Petrobras: empresa estratégica com duplo objetivo. Lei 13.303 exige equilibro: segurança energética (valor público) + eficiência corporativa + transparência. Desafio de governance complexo.",
    },
    {
      id: 905,
      pergunta:
        "Como Lei 13.303 influencia política de remuneração de administradores em Petrobras?",
      opcoes: [
        {
          label: "A",
          valor: "Não influencia; remuneração é livre.",
        },
        {
          label: "B",
          valor:
            "Lei 13.303 exige transparência, aprovação em Assembleia, limites de salários (Lei de Austeridade complementa).",
        },
        {
          label: "C",
          valor:
            "Lei 13.303 proíbe remun eração de administradores.",
        },
        {
          label: "D",
          valor:
            "Apenas governo define remuneração em sigilo.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 garante salários altíssimos sem limite.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: remuneração de administrador deve ser divulgada, aprovada em Assembleia. Lei 13.303 + Lei de Austeridade (Lei 13.460) combinam para limitar/controlar remuneração. Transparência obrigatória.",
    },
    {
      id: 906,
      pergunta:
        "Qual mudança Lei 13.303 trouxe para estrutura de governança da Petrobras pré-2016?",
      opcoes: [
        {
          label: "A",
          valor: "Nenhuma; Petrobras já era modelo antes.",
        },
        {
          label: "B",
          valor:
            "Maior ênfase em transparência, eleição democrática de conselheiros, Conselho Fiscal obrigatório, divulgação de conflitos.",
        },
        {
          label: "C",
          valor:
            "Petrobras foi privatizada por Lei 13.303.",
        },
        {
          label: "D",
          valor:
            "Lei 13.303 eliminou Conselho de Administração.",
        },
        {
          label: "E",
          valor:
            "Nenhum impacto na estrutura de Petrobras.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303/2016: modernizou governança Petrobras. Fortaleceu eleição democrática em Assembleia, obrigou Conselho Fiscal estruturado, aumentou transparency requirements, reforçou responsabilidade pessoal de administradores.",
    },
  ],

  "modulo-10": [
    {
      id: 1001,
      pergunta:
        "Lei 13.303 articula-se com qual outro marco legal importante para empresa estatal?",
      opcoes: [
        {
          label: "A",
          valor: "Lei de Austeridade Federal (Lei 13.460).",
        },
        {
          label: "B",
          valor:
            "Lei 6.404/76 (Lei das S.A.), Lei de Acesso à Informação, LGPD (proteção dados), Lei Anticorrupção.",
        },
        {
          label: "C",
          valor: "Apenas Lei de Privatização.",
        },
        {
          label: "D",
          valor:
            "Lei 13.303 é independente de outras leis.",
        },
        {
          label: "E",
          valor:
            "Apenas com legislação internacional.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 articula-se com múltiplas leis: Lei 6.404 (supletiva), Lei de Acesso (transparência), LGPD (dados), Lei Anticorrupção (compliance). Sistema integrado de governance.",
    },
    {
      id: 1002,
      pergunta:
        "Qual princípio Lei 13.303 NÃO estabelece para Empresa Estatal?",
      opcoes: [
        {
          label: "A",
          valor:
            "Transparência em atos de administração.",
        },
        {
          label: "B",
          valor: "Responsabilidade pessoal de administradores.",
        },
        {
          label: "C",
          valor: "Conformidade com lei e regulações.",
        },
        {
          label: "D",
          valor:
            "Sigilo total de operações, sem divulgação a acionistas.",
        },
        {
          label: "E",
          valor: "Sustentabilidade econômica e social.",
        },
      ],
      correta: "D",
      explicacao:
        "Lei 13.303 estabelece TRANSPARÊNCIA, não sigilo. Sigilo total violaria Lei de Acesso à Informação, Lei 13.303 e princípios democráticos. Petrobras é modelo de divulgação.",
    },
    {
      id: 1003,
      pergunta:
        "Qual é a relação entre Lei 13.303 e a Lei Anticorrupção (Lei 12.846)?",
      opcoes: [
        {
          label: "A",
          valor:
            "Lei Anticorrupção não se aplica a empresas estatais.",
        },
        {
          label: "B",
          valor:
            "Lei 13.303 reforça compliance anticorrupção: obriga divulgação conflitos, responsabilidade de administrador, conformidade com legislação.",
        },
        {
          label: "C",
          valor:
            "Elas se contradizem.",
        },
        {
          label: "D",
          valor:
            "Lei 12.846 é anterior, não afeta Lei 13.303.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 substitui Lei Anticorrupção.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 + Lei 12.846 complementam-se. Ambas exigem compliance: conflito interesse, responsabilidade pessoal, divulgação. Petrobras tem programa anticorrupção rigoroso baseado em ambas.",
    },
    {
      id: 1004,
      pergunta:
        "Se administrador de empresa estatal viola Lei 13.303 deliberadamente, que pode ocorrer?",
      opcoes: [
        {
          label: "A",
          valor:
            "Nada; administrador tem imunidade.",
        },
        {
          label: "B",
          valor:
            "Responsabilidade civil (indenizar empresa), administrativa (demissão/suspensão), criminal (se crime), e cassação de voto.",
        },
        {
          label: "C",
          valor:
            "Apenas empresa é responsável.",
        },
        {
          label: "D",
          valor:
            "Apenas governo pode punir.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 não prevê consequências.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: consequências múltiplas. Responsabilidade civil (acionistas podem processar), administrativa (empresa/governo demite), criminal (crime pode gerar processo), cassação de mandato. Sistema de accountability.",
    },
    {
      id: 1005,
      pergunta:
        "Qual é a importância de Lei 13.303 para confiança de investidores em empresa estatal?",
      opcoes: [
        {
          label: "A",
          valor:
            "Nenhuma importância; investidores ignoram Lei 13.303.",
        },
        {
          label: "B",
          valor:
            "Lei 13.303 garante transparência, governança corporativa, responsabilidade, reduzindo risco. Atrai investimentos nacionais e internacionais.",
        },
        {
          label: "C",
          valor:
            "Lei 13.303 afasta investidores.",
        },
        {
          label: "D",
          valor:
            "Investidores não se importam com governance.",
        },
        {
          label: "E",
          valor:
            "Lei 13.303 garante retorno automaticamente.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 aumenta confiança: transparência reduz incerteza, governance estruturada reduz risco político, responsabilidade pessoal dissuade abuso. Petrobras: investidores confiam por governance robusta.",
    },
    {
      id: 1006,
      pergunta:
        "Qual é o objetivo FINAL de Lei 13.303 para o país e sociedade?",
      opcoes: [
        {
          label: "A",
          valor:
            "Privatizar todas as empresas estatais.",
        },
        {
          label: "B",
          valor:
            "Garantir que empresas estatais funcionem com eficiência, transparência e responsabilidade, servindo interesse público e acionistas.",
        },
        {
          label: "C",
          valor:
            "Aumentar salários de administradores.",
        },
        {
          label: "D",
          valor:
            "Manter sigilo total de operações públicas.",
        },
        {
          label: "E",
          valor:
            "Dar poder total ao governo sobre empresas.",
        },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303: equilibrio entre eficiência (viabilidade econômica) e interesse público (transparência, compliance, responsabilidade). Petrobras exemplifica: empresa rentável + socialmente responsável + democrática.",
    },
  ],
};
