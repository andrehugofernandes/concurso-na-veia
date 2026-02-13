import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Usuario } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calcula o nível do usuário baseado no XP acumulado
 */
export function calcularNivel(xp: number): string {
  if (xp >= 10000) return 'Mestre Supremo';
  if (xp >= 5000) return 'Especialista';
  if (xp >= 2000) return 'Analista Senior';
  if (xp >= 1000) return 'Analista Pleno';
  if (xp >= 500) return 'Analista Junior';
  if (xp >= 200) return 'Trainee';
  return 'Estagiário';
}

/**
 * Salva os dados do usuário no localStorage
 */
export function salvarUsuario(usuario: Usuario): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('petrobras_quest_user', JSON.stringify(usuario));
  }
}

/**
 * Carrega os dados do usuário do localStorage
 */
export function carregarUsuario(): Usuario | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('petrobras_quest_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Erro ao carregar usuário:', e);
        return null;
      }
    }
  }
  return null;
}

/**
 * Formata segundos para o formato mm:ss
 */
export function formatarTempo(segundos: number): string {
  const mins = Math.floor(segundos / 60);
  const secs = segundos % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
