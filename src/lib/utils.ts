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

export async function carregarUsuarioAsync(): Promise<Usuario | null> {
  if (typeof window !== 'undefined') {
    // Tenta pegar do localStorage primeiro
    const localUser = carregarUsuario();
    if (localUser) return localUser;

    // Se não tiver, tenta endpoint de auth (fallback)
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        return data.user;
      }
    } catch (e) {
      console.error(e);
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

const PLAN_LEVELS: Record<string, number> = {
  'Bronze': 1,
  'Prata': 2,
  'Ouro': 3
};

/**
 * Verifica se o plano do usuário atende ao requisito
 */
export function checkPlanAccess(userPlan: string | undefined | null, requiredPlan: string | undefined): boolean {
  if (!requiredPlan) return true; // Se não exigir plano, acesso liberado

  // Normaliza o plano do usuário (pode vir como undefined, null ou string errada)
  const userLevel = PLAN_LEVELS[userPlan || 'Bronze'] || 1;
  const requiredLevel = PLAN_LEVELS[requiredPlan] || 1;

  return userLevel >= requiredLevel;
}
