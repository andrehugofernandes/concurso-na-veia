'use server';

import { createClient } from '@/lib/supabase/server';
import { 
  ActionResponse, 
  createSuccessResponse, 
  createErrorResponse 
} from '@/lib/actions/safe-action';

export interface RankingItem {
  nome: string | null;
  xp: number;
  cargo: string | null;
  avatar_url: string | null;
  nivel: string | null;
  posicao: number;
}

/**
 * Retorna o ranking mundial ou filtrado por cargo.
 */
export async function getRankingAction(
  type: 'geral' | 'cargo' = 'geral',
  cargo?: string
): Promise<ActionResponse<RankingItem[]>> {
  try {
    const supabase = await createClient();
    
    let query = supabase
      .from('profiles')
      .select('nome, xp, cargo, avatar_url, nivel')
      .order('xp', { ascending: false })
      .limit(20);

    if (type === 'cargo' && cargo) {
      query = query.eq('cargo', cargo);
    }

    const { data: rankings, error } = await query;

    if (error) throw error;

    const rankingWithPos = (rankings ?? []).map((r, index) => ({
      ...r,
      posicao: index + 1
    }));

    return createSuccessResponse(rankingWithPos);
  } catch (error: any) {
    console.error('[getRankingAction] Erro:', error);
    return createErrorResponse(error.message || 'Erro ao buscar ranking');
  }
}
