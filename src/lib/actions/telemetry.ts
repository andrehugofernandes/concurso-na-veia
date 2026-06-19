'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { ActionResponse, createSuccessResponse, createErrorResponse } from '@/lib/actions/safe-action';
import { StudentProfile, TelemetryEventInput } from '@/lib/types';

const telemetrySchema = z.object({
  event_type: z.enum(['quiz_completed', 'module_read', 'flashcard_flipped', 'lesson_completed']),
  topic_id: z.string().optional(),
  metadata: z.any().optional(),
});

/**
 * Loga um evento de telemetria no banco de dados
 */
export async function logTelemetryEvent(input: TelemetryEventInput): Promise<ActionResponse<boolean>> {
  try {
    const validated = telemetrySchema.parse(input);
    const supabase = await createClient();

    // Obter usuário logado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return createErrorResponse('Usuário não autenticado');
    }

    // Inserir evento no banco (event sourcing)
    const { error: insertError } = await supabase
      .from('telemetry_events')
      .insert([
        {
          user_id: user.id,
          event_type: validated.event_type,
          topic_id: validated.topic_id || null,
          metadata: validated.metadata || {}
        }
      ]);

    if (insertError) {
      console.error('Erro ao registrar telemetria:', insertError);
      return createErrorResponse(`Erro ao salvar telemetria: ${insertError.message}`);
    }

    // Calcular XP baseado no evento
    let xpGained = 0;
    switch (validated.event_type) {
      case 'quiz_completed':
        // Ganha XP apenas se for correto
        if (validated.metadata?.is_correct) {
          xpGained = 10;
        } else if (validated.metadata?.is_correct === false) {
          // Erro contínuo poderia diminuir XP, mas vamos manter simples por agora
          xpGained = 0; 
        }
        break;
      case 'module_read':
        xpGained = 5;
        break;
      case 'lesson_completed':
        xpGained = 50;
        break;
    }

    // Se ganhou XP, atualiza o perfil do aluno
    if (xpGained > 0) {
      await updateStudentXP(user.id, xpGained);
    }

    return createSuccessResponse(true);
  } catch (error: any) {
    console.error('Erro na action logTelemetryEvent:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse('Dados de evento inválidos');
    }
    return createErrorResponse('Erro inesperado ao registrar evento');
  }
}

/**
 * Busca ou cria o perfil de gamificação do aluno
 */
export async function getStudentProfile(): Promise<ActionResponse<StudentProfile>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return createErrorResponse('Não autenticado');
    }

    let { data, error } = await supabase
      .from('student_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Se não existir, cria o perfil (Estagiário, 0 XP)
    if (error && error.code === 'PGRST116') {
      const { data: newData, error: createError } = await supabase
        .from('student_profiles')
        .insert([{ user_id: user.id }])
        .select()
        .single();
        
      if (createError) return createErrorResponse(`Erro ao criar perfil: ${createError.message}`);
      data = newData;
    } else if (error) {
      return createErrorResponse(`Erro ao buscar perfil: ${error.message}`);
    }

    return createSuccessResponse(data as StudentProfile);
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro inesperado');
  }
}

/**
 * Atualiza o XP e verifica evolução de nível
 */
async function updateStudentXP(userId: string, xpToAdd: number) {
  const supabase = await createClient();
  
  // 1. Busca perfil atual
  const { data: profile } = await supabase
    .from('student_profiles')
    .select('current_xp, current_level')
    .eq('user_id', userId)
    .single();
    
  if (!profile) return;
  
  const newXP = profile.current_xp + xpToAdd;
  
  // 2. Calcula novo nível baseado nas regras (Estagiário, Júnior, Pleno, Sênior)
  let newLevel = profile.current_level;
  if (newXP >= 10001) newLevel = 'Aprovado';
  else if (newXP >= 6001) newLevel = 'Técnico Sênior';
  else if (newXP >= 3001) newLevel = 'Técnico Pleno';
  else if (newXP >= 1001) newLevel = 'Técnico Júnior';
  else newLevel = 'Estagiário';
  
  // 3. Atualiza o banco
  await supabase
    .from('student_profiles')
    .update({ 
      current_xp: newXP, 
      current_level: newLevel,
      last_study_date: new Date().toISOString()
    })
    .eq('user_id', userId);
}
