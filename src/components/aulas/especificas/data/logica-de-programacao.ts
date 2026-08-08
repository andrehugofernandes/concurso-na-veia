// Arquivo gerado automaticamente — dados de conteúdo para Lógica de Programação
// Padrão: C.E.D.E.A com 10 parágrafos por módulo

export interface ModuloConteudo {
  numero: number;
  titulo: string;
  descricao: string;
  intro: {
    titulo: string;
    paragrafos: string[];
  };
  accordion: {
    titulo: string;
    iconName: string;
    conteudo: string;
  }[];
  flipcardsConceito: FlipCardData[];
  flipcardsPratica: FlipCardData[];
  consolidation: {
    sinteseTitle: string;
    sinteseMarkdown: string;
  };
}

export interface FlipCardData {
  color: string;
  iconName: string;
  frenteTitle: string;
  frenteSub: string;
  versoLabel: string;
  versoText: string;
  versoCerto?: string;
  versoErrado?: string;
  categoria: string;
}

export const CONTEUDO_LOGICA_DE_PROGRAMACAO: ModuloConteudo[] = [
  {
    numero: 1,
    titulo: "Fundamentos de Lógica e Algoritmos",
    descricao: "Conceitos basilares de lógica, pensamento computacional e estruturação de algoritmos.",
    intro: {
      titulo: "Fundamentos de Lógica e Algoritmos — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 1 — Fundamentos de Lógica e Algoritmos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 1 — Fundamentos de Lógica e Algoritmos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 1 — Fundamentos de Lógica e Algoritmos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 1 — Fundamentos de Lógica e Algoritmos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 1 — Fundamentos de Lógica e Algoritmos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 1 — Fundamentos de Lógica e Algoritmos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 1 — Fundamentos de Lógica e Algoritmos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 1 — Fundamentos de Lógica e Algoritmos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 1 — Fundamentos de Lógica e Algoritmos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 1 — Fundamentos de Lógica e Algoritmos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Fundamentos de Lógica e Algoritmos." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Fundamentos de Lógica e Algoritmos.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Fundamentos de Lógica e Algoritmos.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Fundamentos de Lógica e Algoritmos.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Fundamentos de Lógica e Algoritmos em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Fundamentos de Lógica e Algoritmos.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Fundamentos de Lógica e Algoritmos",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 1. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 2,
    titulo: "Variáveis, Tipos de Dados e Operadores",
    descricao: "Declaração de variáveis, tipagem, conversões e operadores aritméticos, lógicos e relacionais.",
    intro: {
      titulo: "Variáveis, Tipos de Dados e Operadores — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 2 — Variáveis, Tipos de Dados e Operadores. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 2 — Variáveis, Tipos de Dados e Operadores. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 2 — Variáveis, Tipos de Dados e Operadores. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 2 — Variáveis, Tipos de Dados e Operadores. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 2 — Variáveis, Tipos de Dados e Operadores. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 2 — Variáveis, Tipos de Dados e Operadores. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 2 — Variáveis, Tipos de Dados e Operadores. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 2 — Variáveis, Tipos de Dados e Operadores. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 2 — Variáveis, Tipos de Dados e Operadores. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 2 — Variáveis, Tipos de Dados e Operadores. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Variáveis, Tipos de Dados e Operadores." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Variáveis, Tipos de Dados e Operadores.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Variáveis, Tipos de Dados e Operadores.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Variáveis, Tipos de Dados e Operadores.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Variáveis, Tipos de Dados e Operadores em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Variáveis, Tipos de Dados e Operadores.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Variáveis, Tipos de Dados e Operadores",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 2. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 3,
    titulo: "Estruturas de Decisão (Condicionais)",
    descricao: "If/Else, Switch/Case, operador ternário e aninhamento de condições em pseudocódigo.",
    intro: {
      titulo: "Estruturas de Decisão (Condicionais) — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 3 — Estruturas de Decisão (Condicionais). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 3 — Estruturas de Decisão (Condicionais). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 3 — Estruturas de Decisão (Condicionais). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 3 — Estruturas de Decisão (Condicionais). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 3 — Estruturas de Decisão (Condicionais). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 3 — Estruturas de Decisão (Condicionais). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 3 — Estruturas de Decisão (Condicionais). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 3 — Estruturas de Decisão (Condicionais). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 3 — Estruturas de Decisão (Condicionais). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 3 — Estruturas de Decisão (Condicionais). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Estruturas de Decisão (Condicionais)." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Estruturas de Decisão (Condicionais).", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Estruturas de Decisão (Condicionais).", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Estruturas de Decisão (Condicionais).", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Estruturas de Decisão (Condicionais) em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Estruturas de Decisão (Condicionais).", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Estruturas de Decisão (Condicionais)",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 3. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 4,
    titulo: "Estruturas de Repetição (Laços)",
    descricao: "While, Do-While, For, controle de fluxo com break/continue e complexidade de loops.",
    intro: {
      titulo: "Estruturas de Repetição (Laços) — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 4 — Estruturas de Repetição (Laços). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 4 — Estruturas de Repetição (Laços). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 4 — Estruturas de Repetição (Laços). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 4 — Estruturas de Repetição (Laços). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 4 — Estruturas de Repetição (Laços). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 4 — Estruturas de Repetição (Laços). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 4 — Estruturas de Repetição (Laços). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 4 — Estruturas de Repetição (Laços). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 4 — Estruturas de Repetição (Laços). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 4 — Estruturas de Repetição (Laços). Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Estruturas de Repetição (Laços)." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Estruturas de Repetição (Laços).", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Estruturas de Repetição (Laços).", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Estruturas de Repetição (Laços).", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Estruturas de Repetição (Laços) em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Estruturas de Repetição (Laços).", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Estruturas de Repetição (Laços)",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 4. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 5,
    titulo: "Vetores e Matrizes",
    descricao: "Arrays unidimensionais e bidimensionais, indexação, percurso e operações fundamentais.",
    intro: {
      titulo: "Vetores e Matrizes — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 5 — Vetores e Matrizes. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 5 — Vetores e Matrizes. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 5 — Vetores e Matrizes. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 5 — Vetores e Matrizes. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 5 — Vetores e Matrizes. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 5 — Vetores e Matrizes. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 5 — Vetores e Matrizes. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 5 — Vetores e Matrizes. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 5 — Vetores e Matrizes. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 5 — Vetores e Matrizes. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Vetores e Matrizes." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Vetores e Matrizes.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Vetores e Matrizes.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Vetores e Matrizes.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Vetores e Matrizes em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Vetores e Matrizes.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Vetores e Matrizes",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 5. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 6,
    titulo: "Sub-rotinas: Funções e Procedimentos",
    descricao: "Modularização, passagem de parâmetros por valor e referência, escopo de variáveis.",
    intro: {
      titulo: "Sub-rotinas: Funções e Procedimentos — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 6 — Sub-rotinas: Funções e Procedimentos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 6 — Sub-rotinas: Funções e Procedimentos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 6 — Sub-rotinas: Funções e Procedimentos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 6 — Sub-rotinas: Funções e Procedimentos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 6 — Sub-rotinas: Funções e Procedimentos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 6 — Sub-rotinas: Funções e Procedimentos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 6 — Sub-rotinas: Funções e Procedimentos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 6 — Sub-rotinas: Funções e Procedimentos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 6 — Sub-rotinas: Funções e Procedimentos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 6 — Sub-rotinas: Funções e Procedimentos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Sub-rotinas: Funções e Procedimentos." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Sub-rotinas: Funções e Procedimentos.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Sub-rotinas: Funções e Procedimentos.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Sub-rotinas: Funções e Procedimentos.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Sub-rotinas: Funções e Procedimentos em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Sub-rotinas: Funções e Procedimentos.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Sub-rotinas: Funções e Procedimentos",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 6. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 7,
    titulo: "Algoritmos de Ordenação e Busca",
    descricao: "Bubble Sort, Selection Sort, Insertion Sort, busca sequencial e busca binária.",
    intro: {
      titulo: "Algoritmos de Ordenação e Busca — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 7 — Algoritmos de Ordenação e Busca. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 7 — Algoritmos de Ordenação e Busca. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 7 — Algoritmos de Ordenação e Busca. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 7 — Algoritmos de Ordenação e Busca. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 7 — Algoritmos de Ordenação e Busca. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 7 — Algoritmos de Ordenação e Busca. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 7 — Algoritmos de Ordenação e Busca. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 7 — Algoritmos de Ordenação e Busca. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 7 — Algoritmos de Ordenação e Busca. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 7 — Algoritmos de Ordenação e Busca. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Algoritmos de Ordenação e Busca." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Algoritmos de Ordenação e Busca.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Algoritmos de Ordenação e Busca.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Algoritmos de Ordenação e Busca.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Algoritmos de Ordenação e Busca em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Algoritmos de Ordenação e Busca.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Algoritmos de Ordenação e Busca",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 7. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 8,
    titulo: "Recursividade",
    descricao: "Conceito de recursão, caso base, pilha de chamadas, fatorial, Fibonacci e Torre de Hanoi.",
    intro: {
      titulo: "Recursividade — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 8 — Recursividade. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 8 — Recursividade. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 8 — Recursividade. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 8 — Recursividade. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 8 — Recursividade. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 8 — Recursividade. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 8 — Recursividade. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 8 — Recursividade. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 8 — Recursividade. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 8 — Recursividade. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Recursividade." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Recursividade.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Recursividade.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Recursividade.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Recursividade em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Recursividade.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Recursividade",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 8. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 9,
    titulo: "Estruturas de Dados Fundamentais",
    descricao: "Pilhas (LIFO), filas (FIFO), listas encadeadas e árvores binárias — visão introdutória.",
    intro: {
      titulo: "Estruturas de Dados Fundamentais — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 9 — Estruturas de Dados Fundamentais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 9 — Estruturas de Dados Fundamentais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 9 — Estruturas de Dados Fundamentais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 9 — Estruturas de Dados Fundamentais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 9 — Estruturas de Dados Fundamentais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 9 — Estruturas de Dados Fundamentais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 9 — Estruturas de Dados Fundamentais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 9 — Estruturas de Dados Fundamentais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 9 — Estruturas de Dados Fundamentais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 9 — Estruturas de Dados Fundamentais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Estruturas de Dados Fundamentais." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Estruturas de Dados Fundamentais.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Estruturas de Dados Fundamentais.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Estruturas de Dados Fundamentais.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Estruturas de Dados Fundamentais em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Estruturas de Dados Fundamentais.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Estruturas de Dados Fundamentais",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 9. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 10,
    titulo: "Questões Estratégicas CESGRANRIO",
    descricao: "Teste de mesa, rastreamento de código, pegadinhas de prova e simulação final.",
    intro: {
      titulo: "Questões Estratégicas CESGRANRIO — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 10 — Questões Estratégicas CESGRANRIO. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 10 — Questões Estratégicas CESGRANRIO. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 10 — Questões Estratégicas CESGRANRIO. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 10 — Questões Estratégicas CESGRANRIO. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 10 — Questões Estratégicas CESGRANRIO. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 10 — Questões Estratégicas CESGRANRIO. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 10 — Questões Estratégicas CESGRANRIO. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 10 — Questões Estratégicas CESGRANRIO. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 10 — Questões Estratégicas CESGRANRIO. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 10 — Questões Estratégicas CESGRANRIO. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Questões Estratégicas CESGRANRIO." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Questões Estratégicas CESGRANRIO.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Questões Estratégicas CESGRANRIO.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Questões Estratégicas CESGRANRIO.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Questões Estratégicas CESGRANRIO em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Questões Estratégicas CESGRANRIO.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Questões Estratégicas CESGRANRIO",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 10. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
];
