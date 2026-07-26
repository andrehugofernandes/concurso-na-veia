import { LuBookOpen, LuTarget, LuTriangle, LuLayers, LuMessageSquare, LuAward, LuUsers, LuShield, LuActivity, LuTrendingUp } from 'react-icons/lu';

export const MODULE_DEFS = [
  { id: 'modulo-1', title: 'Estrutura e Princípios do RLCP', label: 'Tópico 1', icon: LuBookOpen },
  { id: 'modulo-2', title: 'Fase Interna e Planejamento da Contratação', label: 'Tópico 2', icon: LuTarget },
  { id: 'modulo-3', title: 'Modalidades de Licitação na Petrobras', label: 'Tópico 3', icon: LuTriangle },
  { id: 'modulo-4', title: 'Critérios de Julgamento', label: 'Tópico 4', icon: LuLayers },
  { id: 'modulo-5', title: 'Habilitação de Fornecedores', label: 'Tópico 5', icon: LuMessageSquare },
  { id: 'modulo-6', title: 'Recursos e Impugnações', label: 'Tópico 6', icon: LuAward },
  { id: 'modulo-7', title: 'Regimes de Execução Contratual', label: 'Tópico 7', icon: LuUsers },
  { id: 'modulo-8', title: 'Garantias Contratuais', label: 'Tópico 8', icon: LuShield },
  { id: 'modulo-9', title: 'Alterações e Rescisão no RLCP', label: 'Tópico 9', icon: LuActivity },
  { id: 'modulo-10', title: 'Penalidades a Fornecedores', label: 'Tópico 10', icon: LuTrendingUp },
];

export const MODULE_CONTENTS: Record<number, any> = {
  1: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Estrutura e Princípios do RLCP.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Estrutura e Princípios do RLCP envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Estrutura e Princípios do RLCP.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Estrutura e Princípios do RLCP.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Estrutura e Princípios do RLCP",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Estrutura e Princípios do RLCP.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Estrutura e Princípios do RLCP.</p>"
      },
      {
        categoria: "Aplicação de Prova",
        iconeFrente: "LuLayers",
        tituloFrente: "Como Cai na Prova?",
        subtituloFrente: "Banca CESGRANRIO",
        tituloVerso: "Estratégia",
        conteudoVerso: "<p>Atenção aos distratores comuns.</p>"
      }
    ],
    sinteseEstrategica: {
      title: "Síntese Estratégica: Estrutura e Princípios do RLCP",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    },
    textAnalysisLab: {
      titulo: "Análise Clínica: Estrutura e Princípios do RLCP",
      subtitulo: "Veja como a banca aborda esse tema nos enunciados",
      texto: "A administração deve garantir a continuidade dos serviços prestados, sendo vedada a paralisação injustificada da cadeia de suprimentos sob pena de responsabilização solidária.",
      legenda: [
        { cor: "bg-blue-500", label: "Obrigação Legal" },
        { cor: "bg-red-500", label: "Sanção" }
      ]
    },
    questaoResolvida: {
      titulo: "Questão na Prática: Estrutura e Princípios do RLCP",
      banca: "CESGRANRIO",
      ano: "2024",
      concurso: "Processo Seletivo Petrobras",
      enunciado: "Em relação ao tema Estrutura e Princípios do RLCP, a paralisação injustificada da operação...",
      dicaEstrategica: "Lembre-se sempre do princípio da continuidade.",
      alternativas: [
        { letra: "A", texto: "Gera apenas advertência verbal.", correta: false },
        { letra: "B", texto: "Implica em responsabilização solidária dos gestores.", correta: true },
        { letra: "C", texto: "É um direito potestativo da contratada.", correta: false },
        { letra: "D", texto: "Não gera penalidade caso haja aviso prévio de 24h.", correta: false },
        { letra: "E", texto: "Aplica-se apenas ao setor privado.", correta: false }
      ],
      passos: [
        { titulo: "Passo 1: Leitura do Enunciado", conteudo: "O foco da questão é a responsabilização." },
        { titulo: "Passo 2: Análise da Alternativa B", conteudo: "A responsabilização solidária é a regra para a quebra da continuidade." }
      ]
    }
  },
  2: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Fase Interna e Planejamento da Contratação.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Fase Interna e Planejamento da Contratação envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Fase Interna e Planejamento da Contratação.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Fase Interna e Planejamento da Contratação.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Fase Interna e Planejamento da Contratação",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Fase Interna e Planejamento da Contratação.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Fase Interna e Planejamento da Contratação.</p>"
      },
      {
        categoria: "Aplicação de Prova",
        iconeFrente: "LuLayers",
        tituloFrente: "Como Cai na Prova?",
        subtituloFrente: "Banca CESGRANRIO",
        tituloVerso: "Estratégia",
        conteudoVerso: "<p>Atenção aos distratores comuns.</p>"
      }
    ],
    sinteseEstrategica: {
      title: "Síntese Estratégica: Fase Interna e Planejamento da Contratação",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  3: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Modalidades de Licitação na Petrobras.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Modalidades de Licitação na Petrobras envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Modalidades de Licitação na Petrobras.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Modalidades de Licitação na Petrobras.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Modalidades de Licitação na Petrobras",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Modalidades de Licitação na Petrobras.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Modalidades de Licitação na Petrobras.</p>"
      },
      {
        categoria: "Aplicação de Prova",
        iconeFrente: "LuLayers",
        tituloFrente: "Como Cai na Prova?",
        subtituloFrente: "Banca CESGRANRIO",
        tituloVerso: "Estratégia",
        conteudoVerso: "<p>Atenção aos distratores comuns.</p>"
      }
    ],
    sinteseEstrategica: {
      title: "Síntese Estratégica: Modalidades de Licitação na Petrobras",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  4: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Critérios de Julgamento.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Critérios de Julgamento envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Critérios de Julgamento.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Critérios de Julgamento.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Critérios de Julgamento",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Critérios de Julgamento.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Critérios de Julgamento.</p>"
      },
      {
        categoria: "Aplicação de Prova",
        iconeFrente: "LuLayers",
        tituloFrente: "Como Cai na Prova?",
        subtituloFrente: "Banca CESGRANRIO",
        tituloVerso: "Estratégia",
        conteudoVerso: "<p>Atenção aos distratores comuns.</p>"
      }
    ],
    sinteseEstrategica: {
      title: "Síntese Estratégica: Critérios de Julgamento",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  5: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Habilitação de Fornecedores.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Habilitação de Fornecedores envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Habilitação de Fornecedores.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Habilitação de Fornecedores.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Habilitação de Fornecedores",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Habilitação de Fornecedores.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Habilitação de Fornecedores.</p>"
      },
      {
        categoria: "Aplicação de Prova",
        iconeFrente: "LuLayers",
        tituloFrente: "Como Cai na Prova?",
        subtituloFrente: "Banca CESGRANRIO",
        tituloVerso: "Estratégia",
        conteudoVerso: "<p>Atenção aos distratores comuns.</p>"
      }
    ],
    sinteseEstrategica: {
      title: "Síntese Estratégica: Habilitação de Fornecedores",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  6: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Recursos e Impugnações.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Recursos e Impugnações envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Recursos e Impugnações.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Recursos e Impugnações.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Recursos e Impugnações",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Recursos e Impugnações.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Recursos e Impugnações.</p>"
      },
      {
        categoria: "Aplicação de Prova",
        iconeFrente: "LuLayers",
        tituloFrente: "Como Cai na Prova?",
        subtituloFrente: "Banca CESGRANRIO",
        tituloVerso: "Estratégia",
        conteudoVerso: "<p>Atenção aos distratores comuns.</p>"
      }
    ],
    sinteseEstrategica: {
      title: "Síntese Estratégica: Recursos e Impugnações",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  7: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Regimes de Execução Contratual.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Regimes de Execução Contratual envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Regimes de Execução Contratual.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Regimes de Execução Contratual.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Regimes de Execução Contratual",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Regimes de Execução Contratual.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Regimes de Execução Contratual.</p>"
      },
      {
        categoria: "Aplicação de Prova",
        iconeFrente: "LuLayers",
        tituloFrente: "Como Cai na Prova?",
        subtituloFrente: "Banca CESGRANRIO",
        tituloVerso: "Estratégia",
        conteudoVerso: "<p>Atenção aos distratores comuns.</p>"
      }
    ],
    sinteseEstrategica: {
      title: "Síntese Estratégica: Regimes de Execução Contratual",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  8: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Garantias Contratuais.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Garantias Contratuais envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Garantias Contratuais.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Garantias Contratuais.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Garantias Contratuais",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Garantias Contratuais.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Garantias Contratuais.</p>"
      },
      {
        categoria: "Aplicação de Prova",
        iconeFrente: "LuLayers",
        tituloFrente: "Como Cai na Prova?",
        subtituloFrente: "Banca CESGRANRIO",
        tituloVerso: "Estratégia",
        conteudoVerso: "<p>Atenção aos distratores comuns.</p>"
      }
    ],
    sinteseEstrategica: {
      title: "Síntese Estratégica: Garantias Contratuais",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  9: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Alterações e Rescisão no RLCP.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Alterações e Rescisão no RLCP envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Alterações e Rescisão no RLCP.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Alterações e Rescisão no RLCP.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Alterações e Rescisão no RLCP",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Alterações e Rescisão no RLCP.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Alterações e Rescisão no RLCP.</p>"
      },
      {
        categoria: "Aplicação de Prova",
        iconeFrente: "LuLayers",
        tituloFrente: "Como Cai na Prova?",
        subtituloFrente: "Banca CESGRANRIO",
        tituloVerso: "Estratégia",
        conteudoVerso: "<p>Atenção aos distratores comuns.</p>"
      }
    ],
    sinteseEstrategica: {
      title: "Síntese Estratégica: Alterações e Rescisão no RLCP",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  10: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Penalidades a Fornecedores.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Penalidades a Fornecedores envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Penalidades a Fornecedores.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Penalidades a Fornecedores.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Penalidades a Fornecedores",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Penalidades a Fornecedores.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Penalidades a Fornecedores.</p>"
      },
      {
        categoria: "Aplicação de Prova",
        iconeFrente: "LuLayers",
        tituloFrente: "Como Cai na Prova?",
        subtituloFrente: "Banca CESGRANRIO",
        tituloVerso: "Estratégia",
        conteudoVerso: "<p>Atenção aos distratores comuns.</p>"
      }
    ],
    sinteseEstrategica: {
      title: "Síntese Estratégica: Penalidades a Fornecedores",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
};
