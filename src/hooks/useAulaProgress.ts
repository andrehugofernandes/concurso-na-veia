'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ProgressData {
    progress_percent: number;
    completed: boolean;
    completed_at: string | null;
    xp_awarded: number;
}

interface UseAulaProgressReturn {
    progress: number;
    completed: boolean;
    loading: boolean;
    error: string | null;
    updateProgress: (percent: number) => Promise<void>;
    completeAula: () => Promise<{ success: boolean; xp_awarded: number }>;
}

export function useAulaProgress(materiaId: string, topicoId: string): UseAulaProgressReturn {
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    // Carregar progresso inicial
    useEffect(() => {
        const loadProgress = async () => {
            try {
                setLoading(true);
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    setLoading(false);
                    return;
                }

                const { data, error: fetchError } = await supabase
                    .from('aulas_progress')
                    .select('progress_percent, completed, completed_at, xp_awarded')
                    .eq('user_id', user.id)
                    .eq('materia_id', materiaId)
                    .eq('topico_id', topicoId)
                    .single();

                if (fetchError && fetchError.code !== 'PGRST116') {
                    // PGRST116 = not found, which is ok for new topics
                    throw fetchError;
                }

                if (data) {
                    setProgress(data.progress_percent);
                    setCompleted(data.completed);
                }
            } catch (err) {
                console.error('Error loading progress:', JSON.stringify(err, null, 2));
                setError('Erro ao carregar progresso');
            } finally {
                setLoading(false);
            }
        };

        loadProgress();
    }, [materiaId, topicoId, supabase]);

    // Atualizar progresso (debounced no componente que usa)
    const updateProgress = useCallback(async (percent: number) => {
        if (completed) return; // Não atualizar se já completou

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error: upsertError } = await supabase
                .from('aulas_progress')
                .upsert({
                    user_id: user.id,
                    materia_id: materiaId,
                    topico_id: topicoId,
                    progress_percent: Math.min(Math.round(percent), 100),
                    completed: false
                }, {
                    onConflict: 'user_id,materia_id,topico_id'
                });

            if (upsertError) throw upsertError;
            setProgress(percent);
        } catch (err) {
            console.error('Error updating progress:', JSON.stringify(err, null, 2));
        }
    }, [materiaId, topicoId, completed, supabase]);

    // Marcar aula como concluída e ganhar XP
    const completeAula = useCallback(async (): Promise<{ success: boolean; xp_awarded: number }> => {
        if (completed) {
            return { success: false, xp_awarded: 0 };
        }

        try {
            const { data, error: rpcError } = await supabase
                .rpc('complete_aula_and_award_xp', {
                    p_materia_id: materiaId,
                    p_topico_id: topicoId,
                    p_xp_amount: 50
                });

            if (rpcError) throw rpcError;

            if (data?.success) {
                setCompleted(true);
                setProgress(100);
                return { success: true, xp_awarded: data.xp_awarded };
            }

            return { success: false, xp_awarded: 0 };
        } catch (err) {
            console.error('Error completing aula:', err);
            setError('Erro ao completar aula');
            return { success: false, xp_awarded: 0 };
        }
    }, [materiaId, topicoId, completed, supabase]);

    return {
        progress,
        completed,
        loading,
        error,
        updateProgress,
        completeAula
    };
}

// Hook para obter progresso de todas as aulas do usuário
export function useAllAulasProgress() {
    const [progressData, setProgressData] = useState<Record<string, ProgressData>>({});
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const loadAllProgress = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setLoading(false);
                    return;
                }

                const { data, error } = await supabase
                    .from('aulas_progress')
                    .select('materia_id, topico_id, progress_percent, completed, completed_at, xp_awarded')
                    .eq('user_id', user.id);

                if (error) throw error;

                const progressMap: Record<string, ProgressData> = {};
                data?.forEach(item => {
                    const key = `${item.materia_id}/${item.topico_id}`;
                    progressMap[key] = {
                        progress_percent: item.progress_percent,
                        completed: item.completed,
                        completed_at: item.completed_at,
                        xp_awarded: item.xp_awarded
                    };
                });

                setProgressData(progressMap);
            } catch (err) {
                console.error('Error loading all progress:', err);
            } finally {
                setLoading(false);
            }
        };

        loadAllProgress();
    }, [supabase]);

    const getProgress = (materiaId: string, topicoId: string): ProgressData | null => {
        return progressData[`${materiaId}/${topicoId}`] || null;
    };

    const getTotalCompleted = (materiaId?: string): number => {
        return Object.entries(progressData).filter(([key, data]) => {
            if (materiaId) {
                return key.startsWith(`${materiaId}/`) && data.completed;
            }
            return data.completed;
        }).length;
    };

    return {
        progressData,
        loading,
        getProgress,
        getTotalCompleted
    };
}
