import { LuBookOpen, LuTarget, LuTriangle, LuLayers, LuMessageSquare, LuAward, LuUsers, LuShield, LuActivity, LuTrendingUp } from 'react-icons/lu';

export const MODULE_DEFS = [
  { id: 'modulo-1', title: 'O Papel Estratégico de Compras', label: 'Tópico 1', icon: LuBookOpen },
  { id: 'modulo-2', title: 'Processo de Requisição e Aquisição', label: 'Tópico 2', icon: LuTarget },
  { id: 'modulo-3', title: 'Seleção e Cadastro de Fornecedores', label: 'Tópico 3', icon: LuTriangle },
  { id: 'modulo-4', title: 'Avaliação de Desempenho de Fornecedores', label: 'Tópico 4', icon: LuLayers },
  { id: 'modulo-5', title: 'Matriz de Kraljic (Estratégia de Itens)', label: 'Tópico 5', icon: LuMessageSquare },
  { id: 'modulo-6', title: 'Gestão de Categorias (Category Management)', label: 'Tópico 6', icon: LuAward },
  { id: 'modulo-7', title: 'Ética e Compliance em Compras', label: 'Tópico 7', icon: LuUsers },
  { id: 'modulo-8', title: 'Sourcing Estratégico', label: 'Tópico 8', icon: LuShield },
  { id: 'modulo-9', title: 'E-procurement e Compras Digitais', label: 'Tópico 9', icon: LuActivity },
  { id: 'modulo-10', title: 'KPIs no Setor de Compras', label: 'Tópico 10', icon: LuTrendingUp },
];

export const MODULE_CONTENTS: Record<number, any> = {
  1: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de O Papel Estratégico de Compras.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de O Papel Estratégico de Compras envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em O Papel Estratégico de Compras.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre O Papel Estratégico de Compras.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: O Papel Estratégico de Compras",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de O Papel Estratégico de Compras.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de O Papel Estratégico de Compras.</p>"
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
      title: "Síntese Estratégica: O Papel Estratégico de Compras",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    },
    textAnalysisLab: {
      titulo: "Análise Clínica: O Papel Estratégico de Compras",
      subtitulo: "Veja como a banca aborda esse tema nos enunciados",
      texto: "A administração deve garantir a continuidade dos serviços prestados, sendo vedada a paralisação injustificada da cadeia de suprimentos sob pena de responsabilização solidária.",
      legenda: [
        { cor: "bg-blue-500", label: "Obrigação Legal" },
        { cor: "bg-red-500", label: "Sanção" }
      ]
    },
    questaoResolvida: {
      titulo: "Questão na Prática: O Papel Estratégico de Compras",
      banca: "CESGRANRIO",
      ano: "2024",
      concurso: "Processo Seletivo Petrobras",
      enunciado: "Em relação ao tema O Papel Estratégico de Compras, a paralisação injustificada da operação...",
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
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Processo de Requisição e Aquisição.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Processo de Requisição e Aquisição envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Processo de Requisição e Aquisição.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Processo de Requisição e Aquisição.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Processo de Requisição e Aquisição",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Processo de Requisição e Aquisição.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Processo de Requisição e Aquisição.</p>"
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
      title: "Síntese Estratégica: Processo de Requisição e Aquisição",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  3: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Seleção e Cadastro de Fornecedores.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Seleção e Cadastro de Fornecedores envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Seleção e Cadastro de Fornecedores.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Seleção e Cadastro de Fornecedores.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Seleção e Cadastro de Fornecedores",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Seleção e Cadastro de Fornecedores.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Seleção e Cadastro de Fornecedores.</p>"
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
      title: "Síntese Estratégica: Seleção e Cadastro de Fornecedores",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  4: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Avaliação de Desempenho de Fornecedores.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Avaliação de Desempenho de Fornecedores envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Avaliação de Desempenho de Fornecedores.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Avaliação de Desempenho de Fornecedores.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Avaliação de Desempenho de Fornecedores",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Avaliação de Desempenho de Fornecedores.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Avaliação de Desempenho de Fornecedores.</p>"
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
      title: "Síntese Estratégica: Avaliação de Desempenho de Fornecedores",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  5: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Matriz de Kraljic (Estratégia de Itens).</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Matriz de Kraljic (Estratégia de Itens) envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Matriz de Kraljic (Estratégia de Itens).</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Matriz de Kraljic (Estratégia de Itens).</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Matriz de Kraljic (Estratégia de Itens)",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Matriz de Kraljic (Estratégia de Itens).</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Matriz de Kraljic (Estratégia de Itens).</p>"
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
      title: "Síntese Estratégica: Matriz de Kraljic (Estratégia de Itens)",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  6: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Gestão de Categorias (Category Management).</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Gestão de Categorias (Category Management) envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Gestão de Categorias (Category Management).</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Gestão de Categorias (Category Management).</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Gestão de Categorias (Category Management)",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Gestão de Categorias (Category Management).</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Gestão de Categorias (Category Management).</p>"
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
      title: "Síntese Estratégica: Gestão de Categorias (Category Management)",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  7: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Ética e Compliance em Compras.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Ética e Compliance em Compras envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Ética e Compliance em Compras.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Ética e Compliance em Compras.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Ética e Compliance em Compras",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Ética e Compliance em Compras.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Ética e Compliance em Compras.</p>"
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
      title: "Síntese Estratégica: Ética e Compliance em Compras",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  8: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Sourcing Estratégico.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Sourcing Estratégico envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Sourcing Estratégico.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Sourcing Estratégico.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Sourcing Estratégico",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Sourcing Estratégico.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Sourcing Estratégico.</p>"
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
      title: "Síntese Estratégica: Sourcing Estratégico",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  9: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de E-procurement e Compras Digitais.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de E-procurement e Compras Digitais envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em E-procurement e Compras Digitais.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre E-procurement e Compras Digitais.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: E-procurement e Compras Digitais",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de E-procurement e Compras Digitais.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de E-procurement e Compras Digitais.</p>"
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
      title: "Síntese Estratégica: E-procurement e Compras Digitais",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  10: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de KPIs no Setor de Compras.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de KPIs no Setor de Compras envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em KPIs no Setor de Compras.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre KPIs no Setor de Compras.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: KPIs no Setor de Compras",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de KPIs no Setor de Compras.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de KPIs no Setor de Compras.</p>"
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
      title: "Síntese Estratégica: KPIs no Setor de Compras",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
};
