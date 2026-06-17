'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';

interface ProgressData {
    progress_percent: number;
    completed: boolean;
    completed_at: string | null;
    xp_awarded: number;
}

interface UseAulaProgressReturn {
    progress: number;
    completed: boolean;
    completedModules: string[];
    loading: boolean;
    error: string | null;
    updateProgress: (percent: number) => Promise<void>;
    updateCompletedModules: (modules: string[]) => Promise<void>;
    completeAula: () => Promise<{ success: boolean; xp_awarded: number }>;
}

export function useAulaProgress(materiaId?: string, topicoId?: string): UseAulaProgressReturn {
    const params = useParams();
    const resolvedMateriaId = materiaId || (params?.materia as string) || '';
    const resolvedTopicoId = topicoId || (params?.topico as string) || '';

    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [completedModules, setCompletedModules] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    // Carregar progresso inicial
    useEffect(() => {
        let isMounted = true;

        const loadProgress = async () => {
            if (!resolvedMateriaId || !resolvedTopicoId) {
                setLoading(false);
                return;
            }
            try {
                if (isMounted) setLoading(true);
                const { data: { user } } = await supabase.auth.getUser();

                if (!user || !isMounted) {
                    if (isMounted) setLoading(false);
                    return;
                }

                const { data, error: fetchError } = await supabase
                    .from('aulas_progress')
                    .select('progress_percent, completed, completed_at, xp_awarded, completed_modules')
                    .eq('user_id', user.id)
                    .eq('materia_id', resolvedMateriaId)
                    .eq('topico_id', resolvedTopicoId)
                    .single();

                if (fetchError && fetchError.code !== 'PGRST116') {
                    throw fetchError;
                }

                if (data && isMounted) {
                    setProgress(data.progress_percent);
                    setCompleted(data.completed);
                    setCompletedModules(data.completed_modules || []);
                }
            } catch (err: any) {
                // Silently ignore abort errors as they are usually component unmounts or re-renders
                const isAbortError = 
                    err?.name === 'AbortError' || 
                    err?.message?.toLowerCase().includes('aborted') ||
                    err?.code === '20' || // DOMException.ABORT_ERR
                    err?.hint?.toLowerCase().includes('aborted');

                if (isAbortError) return;
                
                if (isMounted) {
                    // Standard Errors don't stringify well, so we log them clearly
                    const errorMsg = err?.message || (typeof err === 'string' ? err : 'Unknown error');
                    console.error('Error loading progress:', errorMsg, err);
                    setError('Erro ao carregar progresso');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadProgress();
        return () => { isMounted = false; };
    }, [resolvedMateriaId, resolvedTopicoId, supabase]);

    // Atualizar progresso (debounced no componente que usa)
    const updateProgress = useCallback(async (percent: number) => {
        if (completed || !resolvedMateriaId || !resolvedTopicoId) return; // Não atualizar se já completou

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Progress follows UI logic accurately
            const newProgress = Math.min(Math.round(percent), 100);

            if (newProgress === progress && percent !== 0) return;

            const { error: upsertError } = await supabase
                .from('aulas_progress')
                .upsert({
                    user_id: user.id,
                    materia_id: resolvedMateriaId,
                    topico_id: resolvedTopicoId,
                    progress_percent: newProgress,
                    completed: false
                }, {
                    onConflict: 'user_id,materia_id,topico_id'
                });

            if (upsertError) throw upsertError;
            setProgress(newProgress);
        } catch (err) {
            console.error('Error updating progress:', JSON.stringify(err, null, 2));
        }
    }, [resolvedMateriaId, resolvedTopicoId, completed, supabase, progress]);

    // Atualizar módulos concluídos
    const updateCompletedModules = useCallback(async (modules: string[]) => {
        setCompletedModules(modules);
        if (!resolvedMateriaId || !resolvedTopicoId) return;
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error: upsertError } = await supabase
                .from('aulas_progress')
                .upsert({
                    user_id: user.id,
                    materia_id: resolvedMateriaId,
                    topico_id: resolvedTopicoId,
                    completed_modules: modules,
                }, {
                    onConflict: 'user_id,materia_id,topico_id'
                });

            if (upsertError) throw upsertError;
        } catch (err) {
            console.error('Error updating completed modules:', JSON.stringify(err, null, 2));
        }
    }, [resolvedMateriaId, resolvedTopicoId, supabase]);

    // Marcar aula como concluída e ganhar XP
    const completeAula = useCallback(async (): Promise<{ success: boolean; xp_awarded: number }> => {
        if (completed || !resolvedMateriaId || !resolvedTopicoId) {
            return { success: false, xp_awarded: 0 };
        }

        try {
            const { data, error: rpcError } = await supabase
                .rpc('complete_aula_and_award_xp', {
                    p_materia_id: resolvedMateriaId,
                    p_topico_id: resolvedTopicoId,
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
    }, [resolvedMateriaId, resolvedTopicoId, completed, supabase]);

    return {
        progress,
        completed,
        completedModules,
        loading,
        error,
        updateProgress,
        updateCompletedModules,
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
