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

export interface Ticket {
  id: string;
  user_id: string;
  assunto: string;
  categoria: string;
  mensagem: string;
  status: 'ABERTO' | 'EM_ANDAMENTO' | 'RESOLVIDO';
  created_at: string;
}

export interface CreateTicketInput {
  assunto: string;
  categoria: string;
  mensagem: string;
}

export interface StudentProfile {
  user_id: string;
  current_xp: number;
  current_level: string;
  streak_days: number;
  last_study_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TelemetryEventInput {
  event_type: 'quiz_completed' | 'module_read' | 'flashcard_flipped' | 'lesson_completed';
  topic_id?: string;
  metadata?: Record<string, any>;
}
