'use client';

import { useState } from 'react';
import { logTelemetryEvent, getStudentProfile } from '@/lib/actions/telemetry';
import { TelemetryEventInput, StudentProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function useTelemetry() {
  const { toast } = useToast();
  const [isTracking, setIsTracking] = useState(false);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  /**
   * Função para registrar qualquer evento de gamificação
   */
  const trackEvent = async (event: TelemetryEventInput) => {
    setIsTracking(true);
    try {
      const result = await logTelemetryEvent(event);
      if (result.status !== 'success') {
        console.error('Falha ao registrar telemetria:', result.error);
        return false;
      }
      
      // Feedback visual para ganho de XP em Quizzes
      if (event.event_type === 'quiz_completed' && event.metadata?.is_correct) {
        toast({
          title: 'Acertou! +10 XP 🚀',
          description: 'Você está no caminho certo para a Petrobras.',
          variant: 'default',
        });
      }
      return true;
    } catch (error) {
      console.error('Erro de rede ao registrar telemetria:', error);
      return false;
    } finally {
      setIsTracking(false);
    }
  };

  /**
   * Buscar perfil atualizado do aluno
   */
  const fetchProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const result = await getStudentProfile();
      if (result.status === 'success' && result.data) {
        setProfile(result.data);
      }
    } catch (error) {
      console.error('Erro ao buscar perfil de gamificação', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  return {
    trackEvent,
    fetchProfile,
    profile,
    isTracking,
    isLoadingProfile,
  };
}
