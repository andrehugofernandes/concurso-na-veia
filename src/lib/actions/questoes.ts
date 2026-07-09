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

    let lastError: any;
    const maxRetries = 2;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`[ACTION] Tentativa ${attempt + 1} de ${maxRetries + 1}...`);
          // Espera exponencial: 2s, 4s...
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }

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
          throw new Error('O provedor de IA não conseguiu gerar a questão.');
        }

        return createSuccessResponse(questao);
      } catch (error: any) {
        lastError = error;
        const isRateLimit = error.message?.includes('429') || error.message?.toLowerCase().includes('rate limit');
        
        if (!isRateLimit || attempt === maxRetries) {
          break;
        }
        
        console.warn(`[ACTION] Rate limit atingido na tentativa ${attempt + 1}. Retentando...`);
      }
    }

    throw lastError;
  } catch (error: any) {
    console.error('[gerarQuestaoAction] Erro:', error);
    
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Dados inválidos: ${error.issues[0].message}`);
    }

    return createErrorResponse(error.message || 'Erro inesperado ao gerar questão');
  }
}
const gerarQuestoesLoteSchema = gerarQuestaoSchema.extend({
  quantidade: z.number().min(1).max(10).default(5),
});

/**
 * Server Action para gerar questões em lote.
 */
export async function gerarQuestoesLoteAction(
  input: z.infer<typeof gerarQuestoesLoteSchema>
): Promise<ActionResponse<Questao[]>> {
  try {
    const validated = gerarQuestoesLoteSchema.parse(input);
    const provider = getAIProvider();

    console.log(`[ACTION] Gerando lote de ${validated.quantidade} questões para: ${validated.materia}`);

    let lastError: any;
    const maxRetries = 3;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          // Para lote, o delay precisa ser menor para não causar timeout (504)
          const delay = attempt * 2000; // 2s, 4s...
          console.log(`[ACTION] Rate limit detectado. Aguardando ${delay/1000}s para tentativa ${attempt + 1}...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        const questoes = await provider.generateQuestionsBatch({
          materia: validated.materia,
          dificuldade: validated.dificuldade,
          assunto: validated.assunto,
          contexto: validated.contexto ? {
            cargo: validated.contexto.cargo || 'Geral',
            nivel: validated.contexto.nivel || 'médio',
          } : undefined,
        }, validated.quantidade);

        return createSuccessResponse(questoes);
      } catch (error: any) {
        lastError = error;
        const isRateLimit = error.message?.includes('429') || error.message?.toLowerCase().includes('rate limit');
        
        if (!isRateLimit || attempt === maxRetries) {
          break;
        }
      }
    }

    throw lastError;
  } catch (error: any) {
    console.error('[gerarQuestoesLoteAction] Erro:', error);
    return createErrorResponse(error.message || 'Erro ao gerar lote de questões');
  }
}
