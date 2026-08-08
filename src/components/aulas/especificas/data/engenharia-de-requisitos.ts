// Arquivo gerado automaticamente — dados de conteúdo para Engenharia de Requisitos
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

export const CONTEUDO_ENGENHARIA_DE_REQUISITOS: ModuloConteudo[] = [
  {
    numero: 1,
    titulo: "Fundamentos da Engenharia de Requisitos",
    descricao: "Conceitos essenciais, o papel do analista de requisitos e a importância da elicitação precisa.",
    intro: {
      titulo: "Fundamentos da Engenharia de Requisitos — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 1 — Fundamentos da Engenharia de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 1 — Fundamentos da Engenharia de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 1 — Fundamentos da Engenharia de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 1 — Fundamentos da Engenharia de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 1 — Fundamentos da Engenharia de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 1 — Fundamentos da Engenharia de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 1 — Fundamentos da Engenharia de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 1 — Fundamentos da Engenharia de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 1 — Fundamentos da Engenharia de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 1 — Fundamentos da Engenharia de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Fundamentos da Engenharia de Requisitos." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Fundamentos da Engenharia de Requisitos.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Fundamentos da Engenharia de Requisitos.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Fundamentos da Engenharia de Requisitos.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Fundamentos da Engenharia de Requisitos em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Fundamentos da Engenharia de Requisitos.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Fundamentos da Engenharia de Requisitos",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 1. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 2,
    titulo: "Técnicas de Elicitação",
    descricao: "Entrevistas, brainstorming, prototipação, questionários e observação — ferramentas do analista.",
    intro: {
      titulo: "Técnicas de Elicitação — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 2 — Técnicas de Elicitação. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 2 — Técnicas de Elicitação. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 2 — Técnicas de Elicitação. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 2 — Técnicas de Elicitação. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 2 — Técnicas de Elicitação. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 2 — Técnicas de Elicitação. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 2 — Técnicas de Elicitação. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 2 — Técnicas de Elicitação. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 2 — Técnicas de Elicitação. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 2 — Técnicas de Elicitação. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Técnicas de Elicitação." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Técnicas de Elicitação.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Técnicas de Elicitação.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Técnicas de Elicitação.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Técnicas de Elicitação em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Técnicas de Elicitação.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Técnicas de Elicitação",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 2. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 3,
    titulo: "Requisitos Funcionais vs. Não-Funcionais",
    descricao: "Classificação IEEE 830, atributos de qualidade (ISO 25010) e rastreabilidade cruzada.",
    intro: {
      titulo: "Requisitos Funcionais vs. Não-Funcionais — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 3 — Requisitos Funcionais vs. Não-Funcionais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 3 — Requisitos Funcionais vs. Não-Funcionais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 3 — Requisitos Funcionais vs. Não-Funcionais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 3 — Requisitos Funcionais vs. Não-Funcionais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 3 — Requisitos Funcionais vs. Não-Funcionais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 3 — Requisitos Funcionais vs. Não-Funcionais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 3 — Requisitos Funcionais vs. Não-Funcionais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 3 — Requisitos Funcionais vs. Não-Funcionais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 3 — Requisitos Funcionais vs. Não-Funcionais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 3 — Requisitos Funcionais vs. Não-Funcionais. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Requisitos Funcionais vs. Não-Funcionais." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Requisitos Funcionais vs. Não-Funcionais.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Requisitos Funcionais vs. Não-Funcionais.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Requisitos Funcionais vs. Não-Funcionais.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Requisitos Funcionais vs. Não-Funcionais em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Requisitos Funcionais vs. Não-Funcionais.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Requisitos Funcionais vs. Não-Funcionais",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 3. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 4,
    titulo: "Especificação e Documentação de Requisitos",
    descricao: "SRS (Software Requirements Specification), templates IEEE e boas práticas CESGRANRIO.",
    intro: {
      titulo: "Especificação e Documentação de Requisitos — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 4 — Especificação e Documentação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 4 — Especificação e Documentação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 4 — Especificação e Documentação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 4 — Especificação e Documentação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 4 — Especificação e Documentação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 4 — Especificação e Documentação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 4 — Especificação e Documentação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 4 — Especificação e Documentação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 4 — Especificação e Documentação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 4 — Especificação e Documentação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Especificação e Documentação de Requisitos." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Especificação e Documentação de Requisitos.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Especificação e Documentação de Requisitos.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Especificação e Documentação de Requisitos.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Especificação e Documentação de Requisitos em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Especificação e Documentação de Requisitos.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Especificação e Documentação de Requisitos",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 4. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 5,
    titulo: "Modelagem de Requisitos com UML",
    descricao: "Diagramas de casos de uso, atividades e sequência aplicados à engenharia de requisitos.",
    intro: {
      titulo: "Modelagem de Requisitos com UML — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 5 — Modelagem de Requisitos com UML. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 5 — Modelagem de Requisitos com UML. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 5 — Modelagem de Requisitos com UML. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 5 — Modelagem de Requisitos com UML. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 5 — Modelagem de Requisitos com UML. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 5 — Modelagem de Requisitos com UML. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 5 — Modelagem de Requisitos com UML. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 5 — Modelagem de Requisitos com UML. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 5 — Modelagem de Requisitos com UML. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 5 — Modelagem de Requisitos com UML. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Modelagem de Requisitos com UML." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Modelagem de Requisitos com UML.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Modelagem de Requisitos com UML.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Modelagem de Requisitos com UML.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Modelagem de Requisitos com UML em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Modelagem de Requisitos com UML.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Modelagem de Requisitos com UML",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 5. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 6,
    titulo: "Validação e Verificação de Requisitos",
    descricao: "Revisão por pares, inspeção formal, walk-throughs e critérios de aceitação.",
    intro: {
      titulo: "Validação e Verificação de Requisitos — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 6 — Validação e Verificação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 6 — Validação e Verificação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 6 — Validação e Verificação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 6 — Validação e Verificação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 6 — Validação e Verificação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 6 — Validação e Verificação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 6 — Validação e Verificação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 6 — Validação e Verificação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 6 — Validação e Verificação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 6 — Validação e Verificação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Validação e Verificação de Requisitos." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Validação e Verificação de Requisitos.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Validação e Verificação de Requisitos.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Validação e Verificação de Requisitos.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Validação e Verificação de Requisitos em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Validação e Verificação de Requisitos.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Validação e Verificação de Requisitos",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 6. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 7,
    titulo: "Gerenciamento de Mudanças de Requisitos",
    descricao: "Controle de versão, baseline, CCB (Change Control Board) e rastreabilidade bidirecional.",
    intro: {
      titulo: "Gerenciamento de Mudanças de Requisitos — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 7 — Gerenciamento de Mudanças de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 7 — Gerenciamento de Mudanças de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 7 — Gerenciamento de Mudanças de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 7 — Gerenciamento de Mudanças de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 7 — Gerenciamento de Mudanças de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 7 — Gerenciamento de Mudanças de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 7 — Gerenciamento de Mudanças de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 7 — Gerenciamento de Mudanças de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 7 — Gerenciamento de Mudanças de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 7 — Gerenciamento de Mudanças de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Gerenciamento de Mudanças de Requisitos." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Gerenciamento de Mudanças de Requisitos.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Gerenciamento de Mudanças de Requisitos.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Gerenciamento de Mudanças de Requisitos.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Gerenciamento de Mudanças de Requisitos em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Gerenciamento de Mudanças de Requisitos.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Gerenciamento de Mudanças de Requisitos",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 7. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 8,
    titulo: "Priorização e Negociação de Requisitos",
    descricao: "Técnicas MoSCoW, Kano, AHP e resolução de conflitos entre stakeholders.",
    intro: {
      titulo: "Priorização e Negociação de Requisitos — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 8 — Priorização e Negociação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 8 — Priorização e Negociação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 8 — Priorização e Negociação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 8 — Priorização e Negociação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 8 — Priorização e Negociação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 8 — Priorização e Negociação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 8 — Priorização e Negociação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 8 — Priorização e Negociação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 8 — Priorização e Negociação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 8 — Priorização e Negociação de Requisitos. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Priorização e Negociação de Requisitos." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Priorização e Negociação de Requisitos.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Priorização e Negociação de Requisitos.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Priorização e Negociação de Requisitos.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Priorização e Negociação de Requisitos em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Priorização e Negociação de Requisitos.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Priorização e Negociação de Requisitos",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 8. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 9,
    titulo: "Requisitos em Metodologias Ágeis",
    descricao: "User Stories, épicos, critérios de aceitação, product backlog e Definition of Done.",
    intro: {
      titulo: "Requisitos em Metodologias Ágeis — Introdução C.E.D.E.A",
      paragrafos: [
        "<strong>[Contexto]</strong> Parágrafo 1 do Módulo 9 — Requisitos em Metodologias Ágeis. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Contexto]</strong> Parágrafo 2 do Módulo 9 — Requisitos em Metodologias Ágeis. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 3 do Módulo 9 — Requisitos em Metodologias Ágeis. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Explicação]</strong> Parágrafo 4 do Módulo 9 — Requisitos em Metodologias Ágeis. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 5 do Módulo 9 — Requisitos em Metodologias Ágeis. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Demonstração]</strong> Parágrafo 6 do Módulo 9 — Requisitos em Metodologias Ágeis. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 7 do Módulo 9 — Requisitos em Metodologias Ágeis. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Expansão]</strong> Parágrafo 8 do Módulo 9 — Requisitos em Metodologias Ágeis. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 9 do Módulo 9 — Requisitos em Metodologias Ágeis. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação.",
        "<strong>[Aplicação]</strong> Parágrafo 10 do Módulo 9 — Requisitos em Metodologias Ágeis. Este conteúdo denso aborda aspectos fundamentais desta disciplina, com foco na banca CESGRANRIO e nos padrões cobrados nos concursos da Petrobras. A compreensão profunda deste tópico é essencial para a aprovação."
      ]
    },
    accordion: [
      { titulo: "Conceito Principal", iconName: "LuZap", conteudo: "Detalhamento técnico do conceito principal de Requisitos em Metodologias Ágeis." },
      { titulo: "Aplicação Prática", iconName: "LuActivity", conteudo: "Como esse conceito é aplicado em cenários reais e em provas CESGRANRIO." },
      { titulo: "Armadilhas Comuns", iconName: "LuShieldAlert", conteudo: "Pegadinhas e erros frequentes que a banca explora neste tema." }
    ],
    flipcardsConceito: [
      { color: "cyan", iconName: "LuZap", frenteTitle: "Conceito-Chave", frenteSub: "Clique para expandir", versoLabel: "DETALHAMENTO", versoText: "Conceito técnico aprofundado sobre Requisitos em Metodologias Ágeis.", versoCerto: "O que a banca considera correto", versoErrado: "Erro comum dos candidatos", categoria: "Detalhamento Técnico" },
      { color: "blue", iconName: "LuCpu", frenteTitle: "Fundamento Teórico", frenteSub: "Clique para expandir", versoLabel: "TEORIA", versoText: "Base teórica fundamental para Requisitos em Metodologias Ágeis.", versoCerto: "Interpretação correta", versoErrado: "Interpretação incorreta", categoria: "Detalhamento Técnico" },
      { color: "indigo", iconName: "LuLayers", frenteTitle: "Taxonomia", frenteSub: "Clique para expandir", versoLabel: "CLASSIFICAÇÃO", versoText: "Classificações e categorias dentro de Requisitos em Metodologias Ágeis.", versoCerto: "Classificação oficial", versoErrado: "Classificação errônea", categoria: "Detalhamento Técnico" }
    ],
    flipcardsPratica: [
      { color: "emerald", iconName: "LuCheck", frenteTitle: "Foco no Valor", frenteSub: "Clique para expandir", versoLabel: "PRÁTICA", versoText: "Aplicação prática de Requisitos em Metodologias Ágeis em contextos reais.", categoria: "Análise Prática" },
      { color: "amber", iconName: "LuTrendingUp", frenteTitle: "Padrão de Prova", frenteSub: "Clique para expandir", versoLabel: "CESGRANRIO", versoText: "Como este tema aparece nas provas CESGRANRIO.", categoria: "Análise Prática" },
      { color: "rose", iconName: "LuShieldAlert", frenteTitle: "Armadilha Clássica", frenteSub: "Clique para expandir", versoLabel: "CUIDADO", versoText: "Pegadinha recorrente sobre Requisitos em Metodologias Ágeis.", versoCerto: "Alternativa correta", versoErrado: "Alternativa errada (distrator)", categoria: "Memorização" }
    ],
    consolidation: {
      sinteseTitle: "Síntese Estratégica — Requisitos em Metodologias Ágeis",
      sinteseMarkdown: "Parabéns! Você concluiu o módulo 9. Revise os conceitos-chave e pratique com questões CESGRANRIO."
    }
  },
  {
    numero: 10,
    titulo: "Questões Estratégicas CESGRANRIO",
    descricao: "Padrões de prova, pegadinhas recorrentes e revisão final orientada à banca.",
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
