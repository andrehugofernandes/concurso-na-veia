import { Questao } from "@/lib/types";

export interface AIProviderOptions {
  materia: string;
  dificuldade?: string;
  assunto?: string;
  questoesAnteriores?: string[];
  contexto?: {
    cargo: string;
    nivel: string;
  };
}

export interface AIProvider {
  generateQuestion(options: AIProviderOptions): Promise<Questao>;
}
