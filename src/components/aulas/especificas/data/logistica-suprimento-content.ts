import { LuBookOpen, LuTarget, LuTriangle, LuLayers, LuMessageSquare, LuAward, LuUsers, LuShield, LuActivity, LuTrendingUp } from 'react-icons/lu';

export const MODULE_DEFS = [
  { id: 'modulo-1', title: 'Cadeia de Suprimentos (Supply Chain)', label: 'Tópico 1', icon: LuBookOpen },
  { id: 'modulo-2', title: 'Modalidades de Transporte', label: 'Tópico 2', icon: LuTarget },
  { id: 'modulo-3', title: 'Gestão de Armazenagem', label: 'Tópico 3', icon: LuTriangle },
  { id: 'modulo-4', title: 'Logística Reversa', label: 'Tópico 4', icon: LuLayers },
  { id: 'modulo-5', title: 'Roteirização e Distribuição', label: 'Tópico 5', icon: LuMessageSquare },
  { id: 'modulo-6', title: 'Cross-docking e Transit Point', label: 'Tópico 6', icon: LuAward },
  { id: 'modulo-7', title: 'Custos Logísticos', label: 'Tópico 7', icon: LuUsers },
  { id: 'modulo-8', title: 'Tecnologia e Sistemas de Informação', label: 'Tópico 8', icon: LuShield },
  { id: 'modulo-9', title: 'Gestão de Frotas', label: 'Tópico 9', icon: LuActivity },
  { id: 'modulo-10', title: 'Avaliação de Desempenho Logístico', label: 'Tópico 10', icon: LuTrendingUp },
];

export const MODULE_CONTENTS: Record<number, any> = {
  1: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Cadeia de Suprimentos (Supply Chain).</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Cadeia de Suprimentos (Supply Chain) envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Cadeia de Suprimentos (Supply Chain).</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Cadeia de Suprimentos (Supply Chain).</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Cadeia de Suprimentos (Supply Chain)",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Cadeia de Suprimentos (Supply Chain).</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Cadeia de Suprimentos (Supply Chain).</p>"
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
      title: "Síntese Estratégica: Cadeia de Suprimentos (Supply Chain)",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    },
    textAnalysisLab: {
      titulo: "Análise Clínica: Cadeia de Suprimentos (Supply Chain)",
      subtitulo: "Veja como a banca aborda esse tema nos enunciados",
      texto: "A administração deve garantir a continuidade dos serviços prestados, sendo vedada a paralisação injustificada da cadeia de suprimentos sob pena de responsabilização solidária.",
      legenda: [
        { cor: "bg-blue-500", label: "Obrigação Legal" },
        { cor: "bg-red-500", label: "Sanção" }
      ]
    },
    questaoResolvida: {
      titulo: "Questão na Prática: Cadeia de Suprimentos (Supply Chain)",
      banca: "CESGRANRIO",
      ano: "2024",
      concurso: "Processo Seletivo Petrobras",
      enunciado: "Em relação ao tema Cadeia de Suprimentos (Supply Chain), a paralisação injustificada da operação...",
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
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Modalidades de Transporte.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Modalidades de Transporte envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Modalidades de Transporte.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Modalidades de Transporte.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Modalidades de Transporte",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Modalidades de Transporte.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Modalidades de Transporte.</p>"
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
      title: "Síntese Estratégica: Modalidades de Transporte",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  3: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Gestão de Armazenagem.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Gestão de Armazenagem envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Gestão de Armazenagem.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Gestão de Armazenagem.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Gestão de Armazenagem",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Gestão de Armazenagem.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Gestão de Armazenagem.</p>"
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
      title: "Síntese Estratégica: Gestão de Armazenagem",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  4: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Logística Reversa.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Logística Reversa envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Logística Reversa.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Logística Reversa.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Logística Reversa",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Logística Reversa.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Logística Reversa.</p>"
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
      title: "Síntese Estratégica: Logística Reversa",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  5: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Roteirização e Distribuição.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Roteirização e Distribuição envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Roteirização e Distribuição.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Roteirização e Distribuição.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Roteirização e Distribuição",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Roteirização e Distribuição.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Roteirização e Distribuição.</p>"
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
      title: "Síntese Estratégica: Roteirização e Distribuição",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  6: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Cross-docking e Transit Point.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Cross-docking e Transit Point envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Cross-docking e Transit Point.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Cross-docking e Transit Point.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Cross-docking e Transit Point",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Cross-docking e Transit Point.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Cross-docking e Transit Point.</p>"
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
      title: "Síntese Estratégica: Cross-docking e Transit Point",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  7: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Custos Logísticos.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Custos Logísticos envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Custos Logísticos.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Custos Logísticos.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Custos Logísticos",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Custos Logísticos.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Custos Logísticos.</p>"
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
      title: "Síntese Estratégica: Custos Logísticos",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  8: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Tecnologia e Sistemas de Informação.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Tecnologia e Sistemas de Informação envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Tecnologia e Sistemas de Informação.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Tecnologia e Sistemas de Informação.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Tecnologia e Sistemas de Informação",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Tecnologia e Sistemas de Informação.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Tecnologia e Sistemas de Informação.</p>"
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
      title: "Síntese Estratégica: Tecnologia e Sistemas de Informação",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  9: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Gestão de Frotas.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Gestão de Frotas envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Gestão de Frotas.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Gestão de Frotas.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Gestão de Frotas",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Gestão de Frotas.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Gestão de Frotas.</p>"
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
      title: "Síntese Estratégica: Gestão de Frotas",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  10: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Avaliação de Desempenho Logístico.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Avaliação de Desempenho Logístico envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Avaliação de Desempenho Logístico.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Avaliação de Desempenho Logístico.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Avaliação de Desempenho Logístico",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Avaliação de Desempenho Logístico.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Avaliação de Desempenho Logístico.</p>"
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
      title: "Síntese Estratégica: Avaliação de Desempenho Logístico",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
};
