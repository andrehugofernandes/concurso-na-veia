export interface Usuario {
  nome: string;
  role?: 'user' | 'admin';
  xp: number;
  nivel: string; // Nível do jogador (Gamificação)
  nivelConcurso?: 'medio' | 'superior'; // Nível do concurso
  cargo?: string; // ID do cargo pretendido
  questoesCertas: number;
  questoesErradas: number;
  sequenciaAtual: number;
  maiorSequencia: number;
  conquistas: string[];
  historico: HistoricoSimulado[];
  questoesGeradas: number;
  plan?: 'free' | 'aprovado-medio' | 'aprovado-superior' | 'elite-medio' | 'elite-superior' | 'elite-total';
}

export interface HistoricoSimulado {
  data: string;
  tipo: string;
  acertos: number;
  total: number;
  percentual: number;
  tempo: number;
}

export interface Questao {
  id: number | string;
  materia: string;
  assunto: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
  dificuldade: string;
  banca: string;
  geradaPorIA?: boolean;
  provider?: string;
}

export interface Simulado {
  tipo: string;
  questoes: Questao[];
  respostas: (RespostaQuestao | null)[];
  iniciado: number;
}

export interface RespostaQuestao {
  selecionada: number;
  correta: boolean;
}

export type TipoSimulado = string;
export type DificuldadeQuestao = 'Fácil' | 'Média' | 'Difícil';
