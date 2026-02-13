'use client';

import { useEffect, useCallback, useRef } from 'react';

const STORAGE_PREFIX = 'form_draft_';

interface UseFormPersistenceOptions<T> {
  /**
   * Chave única para identificar o formulário no localStorage
   */
  key: string;
  /**
   * Valores atuais do formulário
   */
  values: T;
  /**
   * Função para atualizar os valores do formulário (ex: reset do react-hook-form)
   */
  setValues: (values: T) => void;
  /**
   * Se true, a persistência está habilitada (ex: apenas para criação, não edição)
   */
  enabled?: boolean;
  /**
   * Debounce em ms para salvar no localStorage (default: 500ms)
   */
  debounceMs?: number;
}

/**
 * Hook para persistir dados de formulário no localStorage
 * Útil para não perder digitação quando o modal é fechado acidentalmente
 */
export function useFormPersistence<T extends Record<string, unknown>>({
  key,
  values,
  setValues,
  enabled = true,
  debounceMs = 500,
}: UseFormPersistenceOptions<T>) {
  const storageKey = `${STORAGE_PREFIX}${key}`;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  // Restaurar dados do localStorage na montagem
  useEffect(() => {
    if (!enabled || initializedRef.current) return;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as T;
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(`[useFormPersistence] Restoring from localStorage (${key}):`, parsed);
        }
        setValues(parsed);
      }
    } catch {
      // Ignora erros de parsing
    }

    initializedRef.current = true;
  }, [enabled, storageKey, setValues, key]);

  // Salvar dados no localStorage com debounce
  useEffect(() => {
    if (!enabled || !initializedRef.current) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(values));
      } catch {
        // Ignora erros de storage (ex: quota exceeded)
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, storageKey, values, debounceMs]);

  // Limpar dados do localStorage
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignora erros
    }
  }, [storageKey]);

  // Verificar se existe um rascunho salvo
  const hasDraft = useCallback(() => {
    try {
      return localStorage.getItem(storageKey) !== null;
    } catch {
      return false;
    }
  }, [storageKey]);

  return {
    clearDraft,
    hasDraft,
  };
}
