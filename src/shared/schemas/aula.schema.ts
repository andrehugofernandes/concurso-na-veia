import { z } from "zod";

// Schema para cada alternativa do Quiz
const QuizAlternativaSchema = z.string().min(1, "A alternativa não pode estar vazia");

// Schema para cada questão do Quiz
export const QuizQuestionSchema = z.object({
  id: z.string().uuid("ID da questão deve ser um UUID válido"),
  pergunta: z.string().min(5, "A pergunta deve ter pelo menos 5 caracteres"),
  alternativas: z.array(QuizAlternativaSchema).length(5, "A questão deve possuir exatamente 5 alternativas"),
  respostaCorreta: z.enum(["A", "B", "C", "D", "E"], {
    errorMap: () => ({ message: "A resposta correta deve ser uma letra de A a E" }),
  }),
  explicacaoStepByStep: z.array(z.string()).min(1, "A explicação deve conter pelo menos 1 passo explicativo"),
});

// Schema para cada FlipCard Premium
export const FlipCardSchema = z.object({
  id: z.string().min(1, "ID do FlipCard é obrigatório"),
  icon: z.string().min(1, "Nome do ícone Lucide é obrigatório"),
  frontTitle: z.string().min(2, "Título frontal muito curto"),
  backContent: z.string().min(10, "Conteúdo do verso deve ser explicativo e detalhado"),
});

// Schema para cada Módulo da Aula
export const ModuloSchema = z.object({
  numero: z.number().int().positive("O número do módulo deve ser um inteiro positivo"),
  titulo: z.string().min(3, "Título do módulo muito curto"),
  introducaoCEDEA: z
    .array(z.string().min(10, "O parágrafo deve ser denso e explicativo"))
    .min(5, "A introdução C.E.D.E.A deve conter pelo menos 5 parágrafos (mínimo de 1 por pilar ou densamente distribuído)"),
  laboratorioTexto: z.string().optional(),
  flipCards: z.array(FlipCardSchema).length(6, "O módulo deve conter exatamente 6 FlipCards para manter a simetria visual"),
  quiz: z.array(QuizQuestionSchema).min(6, "O módulo deve carregar um pool de no mínimo 6 questões para o simulado interno"),
});

// Schema completo do Conteúdo da Aula
export const AulaConteudoSchema = z.object({
  modulos: z.array(ModuloSchema).min(1, "A aula deve possuir pelo menos 1 módulo estruturado"),
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type FlipCardData = z.infer<typeof FlipCardSchema>;
export type ModuloData = z.infer<typeof ModuloSchema>;
export type AulaConteudo = z.infer<typeof AulaConteudoSchema>;
