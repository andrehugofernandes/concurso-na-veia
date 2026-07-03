'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface PetroLingoUnitProgress {
  unitId: string;
  completed: boolean;
  isLocked: boolean;
}

const LOCAL_STORAGE_KEY = 'petrolingo_progress_v1';

export function usePetroLingoProgress(unitIds: string[]) {
  const [progress, setProgress] = useState<Record<string, PetroLingoUnitProgress>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      const progressMap: Record<string, PetroLingoUnitProgress> = {};
      
      // Inicializar todas como bloqueadas (exceto a primeira que é liberada por padrão)
      unitIds.forEach((id, index) => {
        progressMap[id] = {
          unitId: id,
          completed: false,
          isLocked: index === 0 ? false : true,
        };
      });

      // Tentar carregar do LocalStorage
      if (typeof window !== 'undefined') {
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            Object.keys(parsed).forEach(id => {
              if (progressMap[id]) {
                progressMap[id].completed = parsed[id].completed;
              }
            });
          } catch (e) {
            console.error('Error parsing local progress:', e);
          }
        }
      }

      if (user) {
        // Buscar progresso de todas as unidades solicitadas do banco
        const { data } = await supabase
          .from('aulas_progress')
          .select('topico_id, completed')
          .eq('user_id', user.id)
          .eq('materia_id', 'ingles')
          .in('topico_id', [...unitIds, 'petrolingo']);

        data?.forEach(item => {
          if (progressMap[item.topico_id]) {
            progressMap[item.topico_id].completed = item.completed;
          }
        });
      }

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
      // 1. Salvar no LocalStorage para garantir persistência imediata
      if (typeof window !== 'undefined') {
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
        const parsed = localData ? JSON.parse(localData) : {};
        parsed[unitId] = { completed: true };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      // 2. Atualizar estado local imediatamente
      setProgress(prev => {
        const newProgress = { ...prev };
        if (newProgress[unitId]) {
          newProgress[unitId].completed = true;
        }
        // Desbloquear próxima unidade
        const currIndex = unitIds.indexOf(unitId);
        if (currIndex >= 0 && currIndex < unitIds.length - 1) {
          const nextId = unitIds[currIndex + 1];
          if (newProgress[nextId]) {
            newProgress[nextId].isLocked = false;
          }
        }
        return newProgress;
      });

      if (!user) return { success: true };

      // Usar a RPC existente para ganhar XP e marcar como concluído
      const { data, error } = await supabase.rpc('complete_aula_and_award_xp', {
        p_materia_id: 'ingles',
        p_topico_id: unitId,
        p_xp_amount: xpAmount
      });

      if (error) console.error('RPC Error:', error);

      return { success: true, xp_awarded: data?.xp_awarded ?? xpAmount };
    } catch (err) {
      console.error('Error completing PetroLingo unit:', err);
      return { success: false };
    }
  };

  const resetProgress = async () => {
    try {
      // 1. Limpar LocalStorage instantaneamente
      if (typeof window !== 'undefined') {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }

      // 2. Zerar Estado em Memória Instantaneamente
      const resetMap: Record<string, PetroLingoUnitProgress> = {};
      unitIds.forEach((id, index) => {
        resetMap[id] = {
          unitId: id,
          completed: false,
          isLocked: index === 0 ? false : true,
        };
      });
      setProgress(resetMap);

      // 3. Limpar e Atualizar no Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const allIds = [...unitIds, 'petrolingo'];
        
        await supabase
          .from('aulas_progress')
          .delete()
          .eq('user_id', user.id)
          .eq('materia_id', 'ingles')
          .in('topico_id', allIds);

        await supabase
          .from('aulas_progress')
          .update({ completed: false, progress_percent: 0 })
          .eq('user_id', user.id)
          .eq('materia_id', 'ingles')
          .in('topico_id', allIds);
      }

      return { success: true };
    } catch (err) {
      console.error('Error resetting PetroLingo progress:', err);
      return { success: false };
    }
  };

  return {
    progress,
    loading,
    completeUnit,
    resetProgress,
    refresh: loadProgress
  };
}
