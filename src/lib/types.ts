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
  plan?: 'free' | 'pro' | 'enterprise';
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
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
  banca: string;
  geradaPorIA?: boolean;
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
