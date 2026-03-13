'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { 
  ActionResponse, 
  createSuccessResponse, 
  createErrorResponse 
} from '@/lib/actions/safe-action';

const salvarProgressoSchema = z.object({
  lessonId: z.string().min(1),
  moduleId: z.string().min(1),
  data: z.record(z.string(), z.any()),
});

/**
 * Salva o progresso de uma aula para o usuário logado.
 */
export async function salvarProgressoAction(
  input: z.infer<typeof salvarProgressoSchema>
): Promise<ActionResponse<boolean>> {
  try {
    const validated = salvarProgressoSchema.parse(input);
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return createErrorResponse('Não autorizado');
    }

    const payload = {
      user_id: user.id,
      lesson_id: validated.lessonId,
      module_id: validated.moduleId,
      ...validated.data,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('lesson_progress')
      .upsert(payload, { onConflict: 'user_id, lesson_id, module_id' });

    if (error) throw error;

    return createSuccessResponse(true);
  } catch (error: any) {
    console.error('[salvarProgressoAction] Erro:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Dados inválidos: ${error.issues[0].message}`);
    }
    return createErrorResponse(error.message || 'Erro ao salvar progresso');
  }
}

/**
 * Obtém o progresso de uma aula (ou todas) do usuário logado.
 */
export async function getProgressoAction(
  lessonId?: string
): Promise<ActionResponse<any[]>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return createErrorResponse('Não autorizado');
    }

    let query = supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', user.id);

    if (lessonId) {
      query = query.eq('lesson_id', lessonId);
    }

    const { data: progress, error } = await query;

    if (error) {
      if (error.code === '42P01') {
        console.warn('lesson_progress table not found.');
        return createSuccessResponse([]);
      }
      throw error;
    }

    return createSuccessResponse(progress ?? []);
  } catch (error: any) {
    console.error('[getProgressoAction] Erro:', error);
    return createErrorResponse(error.message || 'Erro ao buscar progresso');
  }
}
