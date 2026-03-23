'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface PetroLingoUnitProgress {
  unitId: string;
  completed: boolean;
  isLocked: boolean;
}

export function usePetroLingoProgress(unitIds: string[]) {
  const [progress, setProgress] = useState<Record<string, PetroLingoUnitProgress>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Buscar progresso de todas as unidades solicitadas
      const { data, error } = await supabase
        .from('aulas_progress')
        .select('topico_id, completed')
        .eq('user_id', user.id)
        .eq('materia_id', 'ingles')
        .in('topico_id', unitIds);

      if (error) throw error;

      const progressMap: Record<string, PetroLingoUnitProgress> = {};
      
      // Inicializar todas como bloqueadas (exceto a primeira que é liberada por padrão)
      unitIds.forEach((id, index) => {
        progressMap[id] = {
          unitId: id,
          completed: false,
          isLocked: index === 0 ? false : true,
        };
      });

      // Preencher com dados do banco
      data?.forEach(item => {
        if (progressMap[item.topico_id]) {
          progressMap[item.topico_id].completed = item.completed;
        }
      });

      // Lógica de desbloqueio: se a unidade N está completa, a N+1 está desbloqueada
      unitIds.forEach((id, index) => {
        if (index > 0) {
          const prevId = unitIds[index - 1];
          if (progressMap[prevId].completed) {
            progressMap[id].isLocked = false;
          }
        }
      });

      setProgress(progressMap);
    } catch (err) {
      console.error('Error loading PetroLingo progress:', err);
    } finally {
      setLoading(false);
    }
  }, [unitIds, supabase]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const completeUnit = async (unitId: string, xpAmount: number = 20) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { success: false };

      // Usar a RPC existente para ganhar XP e marcar como concluído
      const { data, error } = await supabase.rpc('complete_aula_and_award_xp', {
        p_materia_id: 'ingles',
        p_topico_id: unitId,
        p_xp_amount: xpAmount
      });

      if (error) throw error;

      if (data?.success) {
        // Atualizar estado local para refletir o desbloqueio imediato da próxima
        await loadProgress();
        return { success: true, xp_awarded: data.xp_awarded };
      }

      return { success: false };
    } catch (err) {
      console.error('Error completing PetroLingo unit:', err);
      return { success: false };
    }
  };

  return {
    progress,
    loading,
    completeUnit,
    refresh: loadProgress
  };
}
