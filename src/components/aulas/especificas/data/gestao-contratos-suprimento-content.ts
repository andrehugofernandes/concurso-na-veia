import { LuBookOpen, LuTarget, LuTriangle, LuLayers, LuMessageSquare, LuAward, LuUsers, LuShield, LuActivity, LuTrendingUp } from 'react-icons/lu';

export const MODULE_DEFS = [
  { id: 'modulo-1', title: 'Fundamentos dos Contratos Administrativos', label: 'Tópico 1', icon: LuBookOpen },
  { id: 'modulo-2', title: 'Fases do Ciclo de Vida do Contrato', label: 'Tópico 2', icon: LuTarget },
  { id: 'modulo-3', title: 'O Papel do Gestor e Fiscal de Contrato', label: 'Tópico 3', icon: LuTriangle },
  { id: 'modulo-4', title: 'Cláusulas Exorbitantes e Prerrogativas', label: 'Tópico 4', icon: LuLayers },
  { id: 'modulo-5', title: 'Alterações Contratuais (Aditivos)', label: 'Tópico 5', icon: LuMessageSquare },
  { id: 'modulo-6', title: 'Reajuste, Repactuação e Reequilíbrio', label: 'Tópico 6', icon: LuAward },
  { id: 'modulo-7', title: 'Sanções e Penalidades Administrativas', label: 'Tópico 7', icon: LuUsers },
  { id: 'modulo-8', title: 'Extinção e Rescisão do Contrato', label: 'Tópico 8', icon: LuShield },
  { id: 'modulo-9', title: 'Terceirização e Responsabilidades', label: 'Tópico 9', icon: LuActivity },
  { id: 'modulo-10', title: 'Boas Práticas na Fiscalização', label: 'Tópico 10', icon: LuTrendingUp },
];

export const MODULE_CONTENTS: Record<number, any> = {
  1: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Fundamentos dos Contratos Administrativos.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Fundamentos dos Contratos Administrativos envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Fundamentos dos Contratos Administrativos.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Fundamentos dos Contratos Administrativos.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Fundamentos dos Contratos Administrativos",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Fundamentos dos Contratos Administrativos.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Fundamentos dos Contratos Administrativos.</p>"
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
      title: "Síntese Estratégica: Fundamentos dos Contratos Administrativos",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    },
    textAnalysisLab: {
      titulo: "Análise Clínica: Fundamentos dos Contratos Administrativos",
      subtitulo: "Veja como a banca aborda esse tema nos enunciados",
      texto: "A administração deve garantir a continuidade dos serviços prestados, sendo vedada a paralisação injustificada da cadeia de suprimentos sob pena de responsabilização solidária.",
      legenda: [
        { cor: "bg-blue-500", label: "Obrigação Legal" },
        { cor: "bg-red-500", label: "Sanção" }
      ]
    },
    questaoResolvida: {
      titulo: "Questão na Prática: Fundamentos dos Contratos Administrativos",
      banca: "CESGRANRIO",
      ano: "2024",
      concurso: "Processo Seletivo Petrobras",
      enunciado: "Em relação ao tema Fundamentos dos Contratos Administrativos, a paralisação injustificada da operação...",
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
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Fases do Ciclo de Vida do Contrato.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Fases do Ciclo de Vida do Contrato envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Fases do Ciclo de Vida do Contrato.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Fases do Ciclo de Vida do Contrato.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Fases do Ciclo de Vida do Contrato",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Fases do Ciclo de Vida do Contrato.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Fases do Ciclo de Vida do Contrato.</p>"
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
      title: "Síntese Estratégica: Fases do Ciclo de Vida do Contrato",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  3: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de O Papel do Gestor e Fiscal de Contrato.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de O Papel do Gestor e Fiscal de Contrato envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em O Papel do Gestor e Fiscal de Contrato.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre O Papel do Gestor e Fiscal de Contrato.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: O Papel do Gestor e Fiscal de Contrato",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de O Papel do Gestor e Fiscal de Contrato.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de O Papel do Gestor e Fiscal de Contrato.</p>"
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
      title: "Síntese Estratégica: O Papel do Gestor e Fiscal de Contrato",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  4: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Cláusulas Exorbitantes e Prerrogativas.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Cláusulas Exorbitantes e Prerrogativas envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Cláusulas Exorbitantes e Prerrogativas.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Cláusulas Exorbitantes e Prerrogativas.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Cláusulas Exorbitantes e Prerrogativas",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Cláusulas Exorbitantes e Prerrogativas.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Cláusulas Exorbitantes e Prerrogativas.</p>"
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
      title: "Síntese Estratégica: Cláusulas Exorbitantes e Prerrogativas",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  5: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Alterações Contratuais (Aditivos).</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Alterações Contratuais (Aditivos) envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Alterações Contratuais (Aditivos).</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Alterações Contratuais (Aditivos).</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Alterações Contratuais (Aditivos)",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Alterações Contratuais (Aditivos).</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Alterações Contratuais (Aditivos).</p>"
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
      title: "Síntese Estratégica: Alterações Contratuais (Aditivos)",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  6: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Reajuste, Repactuação e Reequilíbrio.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Reajuste, Repactuação e Reequilíbrio envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Reajuste, Repactuação e Reequilíbrio.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Reajuste, Repactuação e Reequilíbrio.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Reajuste, Repactuação e Reequilíbrio",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Reajuste, Repactuação e Reequilíbrio.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Reajuste, Repactuação e Reequilíbrio.</p>"
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
      title: "Síntese Estratégica: Reajuste, Repactuação e Reequilíbrio",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  7: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Sanções e Penalidades Administrativas.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Sanções e Penalidades Administrativas envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Sanções e Penalidades Administrativas.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Sanções e Penalidades Administrativas.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Sanções e Penalidades Administrativas",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Sanções e Penalidades Administrativas.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Sanções e Penalidades Administrativas.</p>"
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
      title: "Síntese Estratégica: Sanções e Penalidades Administrativas",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  8: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Extinção e Rescisão do Contrato.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Extinção e Rescisão do Contrato envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Extinção e Rescisão do Contrato.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Extinção e Rescisão do Contrato.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Extinção e Rescisão do Contrato",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Extinção e Rescisão do Contrato.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Extinção e Rescisão do Contrato.</p>"
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
      title: "Síntese Estratégica: Extinção e Rescisão do Contrato",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  9: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Terceirização e Responsabilidades.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Terceirização e Responsabilidades envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Terceirização e Responsabilidades.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Terceirização e Responsabilidades.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Terceirização e Responsabilidades",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Terceirização e Responsabilidades.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Terceirização e Responsabilidades.</p>"
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
      title: "Síntese Estratégica: Terceirização e Responsabilidades",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  10: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Boas Práticas na Fiscalização.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Boas Práticas na Fiscalização envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Boas Práticas na Fiscalização.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Boas Práticas na Fiscalização.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Boas Práticas na Fiscalização",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Boas Práticas na Fiscalização.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Boas Práticas na Fiscalização.</p>"
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
      title: "Síntese Estratégica: Boas Práticas na Fiscalização",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
};
