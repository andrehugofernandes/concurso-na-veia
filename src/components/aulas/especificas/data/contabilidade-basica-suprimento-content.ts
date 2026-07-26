import { LuBookOpen, LuTarget, LuTriangle, LuLayers, LuMessageSquare, LuAward, LuUsers, LuShield, LuActivity, LuTrendingUp } from 'react-icons/lu';

export const MODULE_DEFS = [
  { id: 'modulo-1', title: 'Conceito, Objeto e Finalidade da Contabilidade', label: 'Tópico 1', icon: LuBookOpen },
  { id: 'modulo-2', title: 'Patrimônio: Ativo, Passivo e Patrimônio Líquido', label: 'Tópico 2', icon: LuTarget },
  { id: 'modulo-3', title: 'Contas e Plano de Contas', label: 'Tópico 3', icon: LuTriangle },
  { id: 'modulo-4', title: 'Método das Partidas Dobradas', label: 'Tópico 4', icon: LuLayers },
  { id: 'modulo-5', title: 'Escrituração e Lançamentos Contábeis', label: 'Tópico 5', icon: LuMessageSquare },
  { id: 'modulo-6', title: 'Apuração do Resultado do Exercício', label: 'Tópico 6', icon: LuAward },
  { id: 'modulo-7', title: 'Balanço Patrimonial', label: 'Tópico 7', icon: LuUsers },
  { id: 'modulo-8', title: 'Demonstração do Resultado do Exercício (DRE)', label: 'Tópico 8', icon: LuShield },
  { id: 'modulo-9', title: 'Regimes Contábeis (Caixa e Competência)', label: 'Tópico 9', icon: LuActivity },
  { id: 'modulo-10', title: 'Noções de Depreciação e Amortização', label: 'Tópico 10', icon: LuTrendingUp },
];

export const MODULE_CONTENTS: Record<number, any> = {
  1: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Conceito, Objeto e Finalidade da Contabilidade.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Conceito, Objeto e Finalidade da Contabilidade envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Conceito, Objeto e Finalidade da Contabilidade.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Conceito, Objeto e Finalidade da Contabilidade.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Conceito, Objeto e Finalidade da Contabilidade",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Conceito, Objeto e Finalidade da Contabilidade.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Conceito, Objeto e Finalidade da Contabilidade.</p>"
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
      title: "Síntese Estratégica: Conceito, Objeto e Finalidade da Contabilidade",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    },
    textAnalysisLab: {
      titulo: "Análise Clínica: Conceito, Objeto e Finalidade da Contabilidade",
      subtitulo: "Veja como a banca aborda esse tema nos enunciados",
      texto: "A administração deve garantir a continuidade dos serviços prestados, sendo vedada a paralisação injustificada da cadeia de suprimentos sob pena de responsabilização solidária.",
      legenda: [
        { cor: "bg-blue-500", label: "Obrigação Legal" },
        { cor: "bg-red-500", label: "Sanção" }
      ]
    },
    questaoResolvida: {
      titulo: "Questão na Prática: Conceito, Objeto e Finalidade da Contabilidade",
      banca: "CESGRANRIO",
      ano: "2024",
      concurso: "Processo Seletivo Petrobras",
      enunciado: "Em relação ao tema Conceito, Objeto e Finalidade da Contabilidade, a paralisação injustificada da operação...",
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
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Patrimônio: Ativo, Passivo e Patrimônio Líquido.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Patrimônio: Ativo, Passivo e Patrimônio Líquido envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Patrimônio: Ativo, Passivo e Patrimônio Líquido.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Patrimônio: Ativo, Passivo e Patrimônio Líquido.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Patrimônio: Ativo, Passivo e Patrimônio Líquido",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Patrimônio: Ativo, Passivo e Patrimônio Líquido.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Patrimônio: Ativo, Passivo e Patrimônio Líquido.</p>"
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
      title: "Síntese Estratégica: Patrimônio: Ativo, Passivo e Patrimônio Líquido",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  3: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Contas e Plano de Contas.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Contas e Plano de Contas envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Contas e Plano de Contas.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Contas e Plano de Contas.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Contas e Plano de Contas",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Contas e Plano de Contas.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Contas e Plano de Contas.</p>"
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
      title: "Síntese Estratégica: Contas e Plano de Contas",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  4: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Método das Partidas Dobradas.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Método das Partidas Dobradas envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Método das Partidas Dobradas.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Método das Partidas Dobradas.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Método das Partidas Dobradas",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Método das Partidas Dobradas.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Método das Partidas Dobradas.</p>"
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
      title: "Síntese Estratégica: Método das Partidas Dobradas",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  5: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Escrituração e Lançamentos Contábeis.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Escrituração e Lançamentos Contábeis envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Escrituração e Lançamentos Contábeis.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Escrituração e Lançamentos Contábeis.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Escrituração e Lançamentos Contábeis",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Escrituração e Lançamentos Contábeis.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Escrituração e Lançamentos Contábeis.</p>"
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
      title: "Síntese Estratégica: Escrituração e Lançamentos Contábeis",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  6: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Apuração do Resultado do Exercício.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Apuração do Resultado do Exercício envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Apuração do Resultado do Exercício.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Apuração do Resultado do Exercício.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Apuração do Resultado do Exercício",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Apuração do Resultado do Exercício.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Apuração do Resultado do Exercício.</p>"
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
      title: "Síntese Estratégica: Apuração do Resultado do Exercício",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  7: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Balanço Patrimonial.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Balanço Patrimonial envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Balanço Patrimonial.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Balanço Patrimonial.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Balanço Patrimonial",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Balanço Patrimonial.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Balanço Patrimonial.</p>"
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
      title: "Síntese Estratégica: Balanço Patrimonial",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  8: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Demonstração do Resultado do Exercício (DRE).</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Demonstração do Resultado do Exercício (DRE) envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Demonstração do Resultado do Exercício (DRE).</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Demonstração do Resultado do Exercício (DRE).</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Demonstração do Resultado do Exercício (DRE)",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Demonstração do Resultado do Exercício (DRE).</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Demonstração do Resultado do Exercício (DRE).</p>"
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
      title: "Síntese Estratégica: Demonstração do Resultado do Exercício (DRE)",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  9: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Regimes Contábeis (Caixa e Competência).</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Regimes Contábeis (Caixa e Competência) envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Regimes Contábeis (Caixa e Competência).</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Regimes Contábeis (Caixa e Competência).</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Regimes Contábeis (Caixa e Competência)",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Regimes Contábeis (Caixa e Competência).</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Regimes Contábeis (Caixa e Competência).</p>"
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
      title: "Síntese Estratégica: Regimes Contábeis (Caixa e Competência)",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
  10: {
    introducaoCEDEA: [
      "<p><strong>Contexto:</strong> Aprofundamento no conceito de Noções de Depreciação e Amortização.</p>",
      "<p><strong>Contexto:</strong> O entendimento global deste processo impacta diretamente a eficiência corporativa.</p>",
      "<p><strong>Explicação:</strong> Os principais elementos teóricos de Noções de Depreciação e Amortização envolvem regras e padrões regulatórios estritos.</p>",
      "<p><strong>Explicação:</strong> Este domínio requer precisão metodológica e alinhamento com as melhores práticas de mercado.</p>",
      "<p><strong>Demonstração:</strong> Na prática de uma estatal, isso se manifesta na otimização dos fluxos de trabalho e contratos.</p>",
      "<p><strong>Demonstração:</strong> Podemos observar os resultados diretos na redução do custo total de propriedade (TCO).</p>",
      "<p><strong>Expansão:</strong> Avanços tecnológicos têm revolucionado as estratégias em Noções de Depreciação e Amortização.</p>",
      "<p><strong>Expansão:</strong> A intersecção deste tema com compliance e governança adiciona complexidade à operação.</p>",
      "<p><strong>Aplicação:</strong> No estilo da banca CESGRANRIO, as questões frequentemente focam em exceções à regra e pegadinhas terminológicas sobre Noções de Depreciação e Amortização.</p>",
      "<p><strong>Aplicação:</strong> Dominar este fluxo garante vantagem competitiva nas provas dissertativas e de múltipla escolha.</p>"
    ],
    accordions: [
      {
        titulo: "Aprofundamento Teórico: Noções de Depreciação e Amortização",
        conteudo: "<p>Este bloco aborda os detalhes procedimentais de Noções de Depreciação e Amortização.</p>"
      }
    ],
    flipcards: [
      {
        categoria: "Definição Crítica",
        iconeFrente: "LuTarget",
        tituloFrente: "O que é fundamental?",
        subtituloFrente: "Essência",
        tituloVerso: "Definição",
        conteudoVerso: "<p>Principais conceitos de Noções de Depreciação e Amortização.</p>"
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
      title: "Síntese Estratégica: Noções de Depreciação e Amortização",
      content: "<p>Resumo matador dos pontos mais críticos, elaborado para memorização imediata.</p>"
    }
  },
};
