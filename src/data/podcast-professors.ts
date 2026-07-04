/**
 * Mapa de Professores Virtuais por Matéria/Aula
 *
 * Cada professor é nomeado em homenagem a um criador, inventor ou figura
 * histórica relevante ao tema — reforçando o caráter de domínio público.
 */

export interface ProfessorVirtual {
  nome: string; // Nome usado no podcast: "Prof. Bohr"
  nomeCompleto: string; // Nome completo da inspiração
  inspiracao: string; // Descrição curta para o prompt
  area: string; // Área de expertise
  emoji: string; // Ícone visual
}

/**
 * Mapa: chave = `{materiaId}/{aulaId}` ou `{materiaId}` para fallback geral
 *
 * Exemplos de chave:
 * - "ti/engenharia-software" → aula específica
 * - "quimica" → fallback para qualquer aula de química
 */
export const PROFESSORES_MAP: Record<string, ProfessorVirtual> = {
  // ── Tecnologia da Informação ───────────────────────────────────────
  "ti/engenharia-software": {
    nome: "Prof. Dijkstra",
    nomeCompleto: "Edsger W. Dijkstra",
    inspiracao:
      "Edsger Dijkstra, pioneiro da ciência da computação e engenharia de software estruturada",
    area: "Engenharia de Software",
    emoji: "💻",
  },
  "ti/banco-dados": {
    nome: "Prof. Codd",
    nomeCompleto: "Edgar F. Codd",
    inspiracao:
      "Edgar Codd, inventor do modelo relacional de banco de dados",
    area: "Banco de Dados",
    emoji: "🗄️",
  },
  "ti/infraestrutura": {
    nome: "Prof. Cerf",
    nomeCompleto: "Vint Cerf",
    inspiracao:
      "Vint Cerf, um dos pais da Internet e co-criador do protocolo TCP/IP",
    area: "Infraestrutura de TI",
    emoji: "🌐",
  },
  "ti/seguranca-informacao": {
    nome: "Prof. Diffie",
    nomeCompleto: "Whitfield Diffie",
    inspiracao:
      "Whitfield Diffie, pioneiro da criptografia de chave pública",
    area: "Segurança da Informação",
    emoji: "🔐",
  },
  "ti/governanca": {
    nome: "Prof. Deming",
    nomeCompleto: "W. Edwards Deming",
    inspiracao:
      "W. Edwards Deming, pai da gestão da qualidade total e ciclo PDCA",
    area: "Governança de TI",
    emoji: "📊",
  },
  "ti/mobile": {
    nome: "Prof. Kay",
    nomeCompleto: "Alan Kay",
    inspiracao:
      "Alan Kay, visionário da computação pessoal e inventor do conceito de programação orientada a objetos",
    area: "Desenvolvimento Mobile",
    emoji: "📱",
  },
  "ti/web": {
    nome: "Prof. Berners-Lee",
    nomeCompleto: "Tim Berners-Lee",
    inspiracao:
      "Tim Berners-Lee, inventor da World Wide Web",
    area: "Desenvolvimento Web",
    emoji: "🕸️",
  },
  ti: {
    nome: "Prof. Turing",
    nomeCompleto: "Alan Turing",
    inspiracao:
      "Alan Turing, pai da ciência da computação e inteligência artificial",
    area: "Tecnologia da Informação",
    emoji: "🧠",
  },

  // ── Química ────────────────────────────────────────────────────────
  "quimica/estrutura-atomica": {
    nome: "Prof. Bohr",
    nomeCompleto: "Niels Bohr",
    inspiracao:
      "Niels Bohr, físico dinamarquês que propôs o modelo atômico com órbitas quantizadas",
    area: "Estrutura Atômica",
    emoji: "⚛️",
  },
  "quimica/estequiometria": {
    nome: "Prof. Lavoisier",
    nomeCompleto: "Antoine Lavoisier",
    inspiracao:
      "Antoine Lavoisier, pai da química moderna e autor da lei da conservação das massas",
    area: "Estequiometria",
    emoji: "⚗️",
  },
  "quimica/reacoes-quimicas": {
    nome: "Prof. Arrhenius",
    nomeCompleto: "Svante Arrhenius",
    inspiracao:
      "Svante Arrhenius, químico sueco pioneiro na teoria de dissociação eletrolítica e cinética",
    area: "Reações Químicas",
    emoji: "🧪",
  },
  "quimica/quimica-organica": {
    nome: "Prof. Kekulé",
    nomeCompleto: "August Kekulé",
    inspiracao:
      "August Kekulé, químico alemão que descobriu a estrutura do benzeno",
    area: "Química Orgânica",
    emoji: "🔬",
  },
  quimica: {
    nome: "Prof. Mendeleev",
    nomeCompleto: "Dmitri Mendeleev",
    inspiracao:
      "Dmitri Mendeleev, criador da tabela periódica dos elementos",
    area: "Química",
    emoji: "🧪",
  },

  // ── Segurança do Trabalho ──────────────────────────────────────────
  "seguranca/nr-10": {
    nome: "Prof. Ohm",
    nomeCompleto: "Georg Ohm",
    inspiracao:
      "Georg Ohm, físico que formulou a lei fundamental da eletricidade",
    area: "Segurança com Eletricidade",
    emoji: "⚡",
  },
  "seguranca/nr-13": {
    nome: "Prof. Boyle",
    nomeCompleto: "Robert Boyle",
    inspiracao:
      "Robert Boyle, pai da química moderna e estudioso da pressão dos gases",
    area: "Caldeiras e Vasos de Pressão",
    emoji: "🔧",
  },
  "seguranca/nr-33": {
    nome: "Prof. Dalton",
    nomeCompleto: "John Dalton",
    inspiracao:
      "John Dalton, pioneiro nos estudos de gases e pressões parciais",
    area: "Espaços Confinados",
    emoji: "🏗️",
  },
  "seguranca/nr-35": {
    nome: "Prof. Newton",
    nomeCompleto: "Isaac Newton",
    inspiracao:
      "Isaac Newton, formulador das leis da gravidade — essencial para entender riscos em altura",
    area: "Trabalho em Altura",
    emoji: "📐",
  },
  seguranca: {
    nome: "Prof. Ramazzini",
    nomeCompleto: "Bernardino Ramazzini",
    inspiracao:
      "Bernardino Ramazzini, pai da medicina ocupacional",
    area: "Segurança do Trabalho",
    emoji: "🦺",
  },

  // ── Matemática ─────────────────────────────────────────────────────
  matematica: {
    nome: "Prof. Bhaskara",
    nomeCompleto: "Bhaskara II",
    inspiracao:
      "Bhaskara II, matemático e astrônomo indiano do séc. XII, autor da fórmula resolutiva de equações do 2º grau",
    area: "Matemática",
    emoji: "📐",
  },

  // ── Português ──────────────────────────────────────────────────────
  portugues: {
    nome: "Prof. Machado",
    nomeCompleto: "Machado de Assis",
    inspiracao:
      "Machado de Assis, maior escritor brasileiro, mestre da ironia e domínio absoluto da língua portuguesa",
    area: "Língua Portuguesa",
    emoji: "📝",
  },

  // ── Inglês ─────────────────────────────────────────────────────────
  ingles: {
    nome: "Prof. Shakespeare",
    nomeCompleto: "William Shakespeare",
    inspiracao:
      "William Shakespeare, maior dramaturgo da língua inglesa e contribuinte para a formação do inglês moderno",
    area: "Língua Inglesa",
    emoji: "🎭",
  },

  // ── Física ─────────────────────────────────────────────────────────
  fisica: {
    nome: "Prof. Faraday",
    nomeCompleto: "Michael Faraday",
    inspiracao:
      "Michael Faraday, pioneiro do eletromagnetismo e da indução eletromagnética",
    area: "Física",
    emoji: "⚡",
  },

  // ── Administração / Suprimentos ────────────────────────────────────
  administracao: {
    nome: "Prof. Fayol",
    nomeCompleto: "Henri Fayol",
    inspiracao:
      "Henri Fayol, pai da teoria clássica da administração e dos 14 princípios de gestão",
    area: "Administração",
    emoji: "📋",
  },

  // ── Fallback Universal ─────────────────────────────────────────────
  default: {
    nome: "Prof. da Vinci",
    nomeCompleto: "Leonardo da Vinci",
    inspiracao:
      "Leonardo da Vinci, polímata renascentista — cientista, engenheiro, artista e inventor universal",
    area: "Conhecimentos Gerais",
    emoji: "🎨",
  },
};

/**
 * Busca o professor virtual para uma aula específica.
 * Tenta primeiro a chave específica (materia/aula), depois o fallback da matéria.
 */
export function getProfessor(
  materiaId: string,
  aulaId?: string,
): ProfessorVirtual {
  // Tentar chave específica: "ti/engenharia-software"
  if (aulaId) {
    const specificKey = `${materiaId}/${aulaId}`;
    if (PROFESSORES_MAP[specificKey]) {
      return PROFESSORES_MAP[specificKey];
    }
  }

  // Fallback por matéria: "ti"
  if (PROFESSORES_MAP[materiaId]) {
    return PROFESSORES_MAP[materiaId];
  }

  // Fallback universal
  return PROFESSORES_MAP.default;
}
