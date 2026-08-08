export interface CoreTheoryModule {
  introducaoEstatica: string[]; // 4 parágrafos (2 Contexto, 2 Explicação)
  accordionsEstaticos: {
    titulo: string;
    icone: string;
    conteudo: string;
    exemplo: string;
  }[];
}

export const CoreTheoryData: Record<string, CoreTheoryModule> = {
  "lingua-portuguesa": {
    introducaoEstatica: [
      "[Contexto] A Língua Portuguesa é o pilar de qualquer concurso público no Brasil. Dominar suas regras gramaticais e estruturais não é apenas um diferencial, mas um pré-requisito absoluto para a aprovação em provas de alto nível.",
      "[Contexto] As bancas examinadoras, especialmente a Cesgranrio, cobram não apenas a memorização das regras, mas a capacidade de interpretação e aplicação normativa em textos autênticos e situações do dia a dia corporativo.",
      "[Explicação] A estrutura sintática e morfológica do idioma exige atenção aos detalhes de concordância, regência e pontuação. Pequenas alterações na posição de uma vírgula ou na escolha de uma preposição podem mudar completamente o sentido jurídico e prático de uma frase.",
      "[Explicação] Para dominar o conteúdo, o candidato deve internalizar os fundamentos de formação de palavras, classes gramaticais e as regras oficiais de ortografia (incluindo o Novo Acordo Ortográfico), que são a base para a resolução de questões interpretativas e gramaticais."
    ],
    accordionsEstaticos: [
      {
        titulo: "Regra Fundamental Gramatical",
        icone: "LuBrain",
        conteudo: "A concordância (verbal e nominal) e a regência ditam a relação harmônica entre os termos da oração. Identificar o sujeito e o verbo principal é o primeiro passo absoluto na análise sintática.",
        exemplo: "Identificar sujeitos ocultos ou termos deslocados por vírgulas evita 90% dos erros clássicos em questões de sintaxe."
      },
      {
        titulo: "Pontuação e Clareza",
        icone: "LuBookOpen",
        conteudo: "A vírgula não indica pausa para respiração, mas sim a estrutura lógica da frase. Termos deslocados (como adjuntos adverbiais longos) ou orações intercaladas exigem o isolamento normativo.",
        exemplo: "Separar sujeito e predicado com vírgula é o erro mais explorado pelas bancas organizadoras."
      },
      {
        titulo: "Uso da Crase",
        icone: "LuFileText",
        conteudo: "A crase é a fusão da preposição 'a' com o artigo definido feminino 'a'. Sua ocorrência depende da regência do termo anterior e do gênero/aceitação de artigo do termo posterior.",
        exemplo: "Nunca ocorre crase antes de verbos, palavras masculinas ou expressões de tratamento genéricas."
      },
      {
        titulo: "Interpretação e Semântica",
        icone: "LuAlertTriangle",
        conteudo: "Muitas vezes, a resposta de uma questão gramatical depende inteiramente do contexto em que a palavra foi empregada no texto base fornecido pela banca.",
        exemplo: "Conjunções como 'como', 'que' e 'se' possuem múltiplos valores semânticos (causa, conformidade, condição, etc) a depender do contexto."
      }
    ]
  },
  "matematica": {
    introducaoEstatica: [
      "[Contexto] A Matemática em concursos públicos atua como um dos principais filtros de seleção. O domínio das operações básicas e avançadas garante rapidez e precisão na resolução das questões.",
      "[Contexto] A banca Cesgranrio possui um estilo próprio, mesclando conhecimentos algébricos e financeiros com interpretação de gráficos e problemas do cotidiano corporativo.",
      "[Explicação] O raciocínio matemático começa pela tradução do problema textual para a linguagem algébrica. Equacionar o problema corretamente (usando regras de três, porcentagem e equações de 1º e 2º grau) é o núcleo da resolução.",
      "[Explicação] A organização dos dados fornecidos e a definição clara do que está sendo perguntado evitam os 'distratores' (alternativas erradas, mas com resultados parciais) frequentemente usados pelos examinadores."
    ],
    accordionsEstaticos: [
      {
        titulo: "Proporção e Regra de Três",
        icone: "LuBrain",
        conteudo: "A identificação de grandezas diretamente ou inversamente proporcionais é vital antes de montar a equação e cruzar os valores.",
        exemplo: "Tempo e Velocidade são inversamente proporcionais; Tempo e Produção são diretamente proporcionais."
      },
      {
        titulo: "Porcentagem Avançada",
        icone: "LuBookOpen",
        conteudo: "Aumentos e descontos sucessivos não devem ser somados linearmente. Eles incidem sempre sobre o valor atualizado (montante da etapa anterior).",
        exemplo: "Um aumento de 10% seguido de um desconto de 10% não retorna ao valor original, mas sim a 99% dele."
      },
      {
        titulo: "Juros e Matemática Financeira",
        icone: "LuFileText",
        conteudo: "Juros simples crescem linearmente (sobre o capital inicial), enquanto juros compostos crescem exponencialmente (juros sobre juros).",
        exemplo: "Saber converter taxas equivalentes em juros compostos é mandatório para provas de carreiras bancárias."
      },
      {
        titulo: "Gestão do Tempo na Prova",
        icone: "LuAlertTriangle",
        conteudo: "Questões longas e cheias de dados costumam ter soluções simplificadas se o candidato perceber atalhos matemáticos ou padrões de proporção.",
        exemplo: "Pular cálculos desnecessários e usar estimativas nas alternativas pode poupar minutos preciosos."
      }
    ]
  },
  "raciocinio-logico": {
    introducaoEstatica: [
      "[Contexto] O Raciocínio Lógico testa a capacidade do candidato de analisar proposições, identificar argumentos válidos e aplicar dedução lógica sem se apegar ao sentido empírico do texto.",
      "[Contexto] A banca organizadora utiliza conectivos lógicos e equivalências normativas para criar questões de alta precisão que exigem método.",
      "[Explicação] O núcleo da lógica de argumentação reside nas tabelas-verdade dos conectivos (E, OU, SE... ENTÃO, SE E SOMENTE SE) e nas leis de De Morgan para negação de proposições compostas.",
      "[Explicação] Estruturar os argumentos em diagramas lógicos (conjuntos) simplifica imensamente a validação de silogismos e dedução de conclusões válidas."
    ],
    accordionsEstaticos: [
      {
        titulo: "Conectivos e Tabelas-Verdade",
        icone: "LuBrain",
        conteudo: "A condicional 'Se P então Q' só é falsa quando a primeira parte for verdadeira e a segunda for falsa (V -> F).",
        exemplo: "Dominar o valor lógico de cada conectivo economiza tempo precioso de prova."
      },
      {
        titulo: "Negação de Proposições (De Morgan)",
        icone: "LuBookOpen",
        conteudo: "A negação de 'P e Q' é '~P ou ~Q'. A negação de 'Se P então Q' é 'P e ~Q' (Mantém a primeira E nega a segunda).",
        exemplo: "A negação de 'Choveu e molhou' é 'Não choveu OU não molhou'."
      },
      {
        titulo: "Equivalências Lógicas Clássicas",
        icone: "LuFileText",
        conteudo: "'Se P então Q' é equivalente a 'Se não Q então não P' (contrapositiva) e a 'Não P ou Q'.",
        exemplo: "Trocar o conectivo 'Se...então' por 'OU' requer negar a primeira parte."
      },
      {
        titulo: "Diagramas Lógicos e Quantificadores",
        icone: "LuAlertTriangle",
        conteudo: "Todo A é B significa que o conjunto A está contido em B. A negação de 'Todo' é 'Pelo menos um NÃO é'.",
        exemplo: "A negação de 'Todo servidor é ético' é 'Existe algum servidor que NÃO é ético'."
      }
    ]
  },
  "ingles": {
    introducaoEstatica: [
      "[Contexto] A prova de Língua Inglesa em concursos modernos foca na compreensão leitora e interpretação textual em nível intermediário a avançado.",
      "[Contexto] As questões avaliam a capacidade do candidato de extrair ideias centrais, compreender conectores lógicos e interpretar vocabulário técnico no contexto corporativo.",
      "[Explicação] Diferente da gramática pura, a leitura eficiente utiliza estratégias como Skimming (leitura rápida da ideia geral) e Scanning (busca por informações específicas).",
      "[Explicação] O domínio dos falsos cognatos (false friends), tempos verbais e conectivos de coesão (however, therefore, subtle, etc.) evita interpretações equivocadas dos textos da prova."
    ],
    accordionsEstaticos: [
      {
        titulo: "Estratégias de Leitura (Skimming & Scanning)",
        icone: "LuBrain",
        conteudo: "Leia primeiro o enunciado da questão para saber exatamente qual informação procurar antes de ler o texto completo.",
        exemplo: "Identificar palavras-chave no comando da questão direciona a busca no texto."
      },
      {
        titulo: "Conectores Lógicos (Linking Words)",
        icone: "LuBookOpen",
        conteudo: "Palavras como 'However' (entanto), 'Furthermore' (além disso) e 'Although' (embora) determinam o fluxo de ideias.",
        exemplo: "'However' e 'Nonetheless' indicam oposição; 'Therefore' indica conclusão."
      },
      {
        titulo: "Falsos Cognatos Frequentes",
        icone: "LuFileText",
        conteudo: "Palavras semelhantes ao português que possuem significados diferentes. Ex: 'Pretend' significa fingir, não pretender.",
        exemplo: "'Intend' = pretender | 'Pretend' = fingir | 'Actually' = na verdade."
      },
      {
        titulo: "Tempos Verbais e Voz Passiva",
        icone: "LuAlertTriangle",
        conteudo: "Textos técnicos e informativos fazem uso constante da Voz Passiva (Passive Voice) para enfatizar o objeto ou ação em vez do agente.",
        exemplo: "'The report was analyzed by experts' foca no relatório e na análise."
      }
    ]
  },
  "tecnologia-informacao": {
    introducaoEstatica: [
      "[Contexto] A Tecnologia da Informação deixou de ser um conhecimento secundário para se tornar disciplina central nos principais concursos públicos nacionais.",
      "[Contexto] Bancas como a Cesgranrio cobram conceitos atualizados de segurança cibernética, cultura digital, ferramentas em nuvem, banco de dados e inteligência artificial.",
      "[Explicação] Compreender a arquitetura de sistemas, protocolos de rede (TCP/IP, HTTP/HTTPS) e mecanismos de proteção (firewall, criptografia, MFA) é fundamental para resolver questões conceituais e práticas.",
      "[Explicação] A manipulação de dados corporativos via banco de dados relacionais (SQL) e ferramentas de análise (Power BI, Big Data) representa uma competência exigida no dia a dia da carreira."
    ],
    accordionsEstaticos: [
      {
        titulo: "Segurança da Informação e Cibersegurança",
        icone: "LuBrain",
        conteudo: "Os pilares fundamentais da segurança são a Confidencialidade, Integridade, Disponibilidade, Autenticidade e Não-Repúdio (CIDAN).",
        exemplo: "Criptografia garante confidencialidade; hashes garantem integridade dos dados."
      },
      {
        titulo: "Redes e Ferramentas em Nuvem",
        icone: "LuBookOpen",
        conteudo: "Cloud Computing divide-se em IaaS (Infraestrutura), PaaS (Plataforma) e SaaS (Software como Serviço).",
        exemplo: "Uso do Office 365 ou Google Workspace é exemplo clássico de SaaS."
      },
      {
        titulo: "Banco de Dados e Linguagem SQL",
        icone: "LuFileText",
        conteudo: "Comandos SQL dividem-se em DDL (CREATE, ALTER) e DML (SELECT, INSERT, UPDATE, DELETE).",
        exemplo: "O comando SELECT filtra registros enquanto a cláusula WHERE aplica condições específicas."
      },
      {
        titulo: "Transformação Digital e IA",
        icone: "LuAlertTriangle",
        conteudo: "Conceitos de Open Finance, PIX, Inteligência Artificial Generativa e LGPD (Lei Geral de Proteção de Dados) surgem com frequência em provas recentes.",
        exemplo: "A LGPD exige consentimento expresso e finalidade legítima para tratamento de dados pessoais."
      }
    ]
  },
  "atendimento-vendas": {
    introducaoEstatica: [
      "[Contexto] Atendimento ao Cliente e Técnicas de Vendas são cruciais para órgãos e estatais com relacionamento comercial direto com a população.",
      "[Contexto] A prova exige conhecimento sobre satisfação do cliente, resolução de conflitos, escuta ativa e conformidade com o Código de Defesa do Consumidor (CDC).",
      "[Explicação] O atendimento de excelência baseia-se na empatia, agilidade e clareza de comunicação, garantindo que o cliente tenha suas necessidades atendidas de acordo com as normas da instituição.",
      "[Explicação] Técnicas de negociação (como contorno de objeções e sondagem de necessidades) alinham-se ao código de conduta ética para construir relacionamentos de longo prazo."
    ],
    accordionsEstaticos: [
      {
        titulo: "Qualidade no Atendimento e Empatia",
        icone: "LuBrain",
        conteudo: "Atender bem requer postura profissional, escuta ativa e foco na resolução eficiente do problema do cidadão/cliente.",
        exemplo: "Demonstrar interesse genuíno e evitar linguagem excessivamente técnica facilita a comunicação."
      },
      {
        titulo: "Técnicas de Vendas e Negociação",
        icone: "LuBookOpen",
        conteudo: "O processo de vendas envolve Prospecção, Sondagem, Apresentação de Soluções, Contorno de Objeções e Fechamento.",
        exemplo: "Objeções devem ser vistas como oportunidades para esclarecer dúvidas e agregar valor."
      },
      {
        titulo: "Código de Defesa do Consumidor (CDC)",
        icone: "LuFileText",
        conteudo: "O CDC garante direitos básicos como proteção contra publicidade enganosa, informação clara e direito de arrepender-se em compras fora do estabelecimento.",
        exemplo: "Direito de arrependimento no prazo de 7 dias para contratações virtuais ou por telefone."
      },
      {
        titulo: "Fidelização e Pós-Venda",
        icone: "LuAlertTriangle",
        conteudo: "O relacionamento não termina no fechamento do contrato; o acompanhamento pós-venda assegura a satisfação contínua e previne cancelamentos.",
        exemplo: "Pesquisas de satisfação (NPS) medem o nível de recomendação dos serviços prestados."
      }
    ]
  },
  "etica-servico-publico": {
    introducaoEstatica: [
      "[Contexto] A Ética no Serviço Público fundamenta o exercício de qualquer função em instituições estatais e órgãos governamentais.",
      "[Contexto] As bancas avaliam o conhecimento do candidato acerca dos deveres funcionais, vedações, improbidade administrativa e conduta ilibada.",
      "[Explicação] O servidor público deve pautar suas ações pelos princípios da Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência (LIMPE).",
      "[Explicação] O elemento ético vai além da distinção entre legal e ilegal: exige a escolha constante entre o que é conveniente para o interesse público e o que atende a interesses privados."
    ],
    accordionsEstaticos: [
      {
        titulo: "Princípios Constitucionais (LIMPE)",
        icone: "LuBrain",
        conteudo: "A Administração Pública direta e indireta obedece estritamente aos princípios da Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.",
        exemplo: "O princípio da Impessoalidade proíbe a promoção pessoal de autoridades em atos públicos."
      },
      {
        titulo: "Deveres Funcionais do Servidor",
        icone: "LuBookOpen",
        conteudo: "São deveres primordiais: ser assíduo, tratar com urbanidade as pessoas, desempenhar as atribuições com zelo e guardar sigilo sobre assuntos da repartição.",
        exemplo: "O zelo pelo patrimônio público e pelo erário é dever intransferível."
      },
      {
        titulo: "Vedações e Conflito de Interesses",
        icone: "LuFileText",
        conteudo: "É vedado ao servidor usar o cargo para auferir vantagens pessoais, aceitar presentes de quem tenha interesse em decisões suas ou ser conivente com erro.",
        exemplo: "Aceitar propina ou utilizar recursos públicos em benefício próprio configura improbidade."
      },
      {
        titulo: "Comissões de Ética e Processo",
        icone: "LuAlertTriangle",
        conteudo: "As Comissões de Ética atuam na orientação e apuração de condutas, podendo aplicar a pena de censura ética ao servidor.",
        exemplo: "A sanção ética não impede a apuração de responsabilidade civil, administrativa e penal."
      }
    ]
  }
};

// Aliases para mapear diferentes slugs de edital para a mesma base teórica
const AliasMap: Record<string, string> = {
  "portugues": "lingua-portuguesa",
  "lingua-portuguesa": "lingua-portuguesa",
  "matematica": "matematica",
  "matematica-financeira": "matematica",
  "raciocinio-logico": "raciocinio-logico",
  "rlm": "raciocinio-logico",
  "raciocinio-logico-matematico": "raciocinio-logico",
  "ingles": "ingles",
  "lingua-inglesa": "ingles",
  "tecnologia-informacao": "tecnologia-informacao",
  "informatica": "tecnologia-informacao",
  "ti": "tecnologia-informacao",
  "nocoes-de-informatica": "tecnologia-informacao",
  "atendimento-vendas": "atendimento-vendas",
  "atendimento-cliente": "atendimento-vendas",
  "vendas-e-atendimento": "atendimento-vendas",
  "etica-servico-publico": "etica-servico-publico",
  "etica": "etica-servico-publico",
  "etica-e-conduta": "etica-servico-publico"
};

export function getCoreTheory(materiaId: string): CoreTheoryModule | undefined {
  const normalizedKey = AliasMap[materiaId.toLowerCase()] || AliasMap[materiaId.toLowerCase().replace(/[^a-z0-9]/g, "-")];
  if (normalizedKey && CoreTheoryData[normalizedKey]) {
    return CoreTheoryData[normalizedKey];
  }
  return CoreTheoryData[materiaId];
}
