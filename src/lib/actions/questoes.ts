'use server';

import { z } from 'zod';
import { getAIProvider } from '@/lib/ai/provider';
import { 
  ActionResponse, 
  createSuccessResponse, 
  createErrorResponse 
} from '@/lib/actions/safe-action';
import { Questao } from '@/lib/types';

const gerarQuestaoSchema = z.object({
  materia: z.string().min(1, 'Matéria é obrigatória'),
  dificuldade: z.string().optional(),
  assunto: z.string().optional(),
  contexto: z.object({
    cargo: z.string().optional(),
    nivel: z.string().optional(),
  }).optional(),
  questoesAnteriores: z.array(z.string()).optional(),
});

/**
 * Server Action para gerar uma questão de concurso via IA.
 * Valida o input e encapsula a lógica de múltiplos provedores.
 */
export async function gerarQuestaoAction(
  input: z.infer<typeof gerarQuestaoSchema>
): Promise<ActionResponse<Questao>> {
  try {
    const validated = gerarQuestaoSchema.parse(input);
    const provider = getAIProvider();

    console.log(`[ACTION] Gerando questão para: ${validated.materia} (${validated.assunto || 'Geral'})`);

    const questao = await provider.generateQuestion({
      materia: validated.materia,
      dificuldade: validated.dificuldade,
      assunto: validated.assunto,
      contexto: validated.contexto ? {
        cargo: validated.contexto.cargo || 'Geral',
        nivel: validated.contexto.nivel || 'médio',
      } : undefined,
      questoesAnteriores: validated.questoesAnteriores,
    });

    if (!questao) {
      return createErrorResponse('O provedor de IA não conseguiu gerar a questão.');
    }

    return createSuccessResponse(questao);
  } catch (error: any) {
    console.error('[gerarQuestaoAction] Erro:', error);
    
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Dados inválidos: ${error.issues[0].message}`);
    }

    return createErrorResponse(error.message || 'Erro inesperado ao gerar questão');
  }
}
