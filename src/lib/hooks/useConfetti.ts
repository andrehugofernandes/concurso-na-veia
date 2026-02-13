import { useCallback } from 'react';

export interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
  angle?: number;
  gravity?: number;
  scalar?: number;
  ticks?: number;
  startVelocity?: number;
}

/**
 * Hook para disparar confetti após ações bem-sucedidas
 * Carrega canvas-confetti dinamicamente para evitar overhead
 *
 * @example
 * const triggerConfetti = useConfetti();
 * 
 * const handleSuccess = () => {
 *   triggerConfetti(); // Usa configuração padrão
 *   // ou
 *   triggerConfetti({ particleCount: 200, spread: 100 });
 * };
 */
export function useConfetti() {
  return useCallback((options?: ConfettiOptions) => {
    void import('canvas-confetti')
      .then(({ default: confetti }) => {
        // Configuração padrão: confetti rápido e celebratório
        const defaultOptions: ConfettiOptions = {
          particleCount: 120,
          spread: 160,
          gravity: 0.8,
          scalar: 1.1,
          ticks: 200,
          startVelocity: 35,
          ...options,
        };

        // Disparo central
        confetti({
          ...defaultOptions,
          origin: { x: 0.5, y: 0.3 },
        });

        // Esquerda
        setTimeout(() => {
          confetti({
            ...defaultOptions,
            particleCount: 80,
            origin: { x: 0.2, y: 0.4 },
          });
        }, 150);

        // Direita
        setTimeout(() => {
          confetti({
            ...defaultOptions,
            particleCount: 80,
            origin: { x: 0.8, y: 0.4 },
          });
        }, 300);
      })
      .catch(() => {
        // Falha silenciosa - não é crítico
      });
  }, []);
}
