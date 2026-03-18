'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { 
  ActionResponse, 
  createSuccessResponse, 
  createErrorResponse 
} from '@/lib/actions/safe-action';
import { cookies } from 'next/headers';

const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

const registerSchema = z.object({
  nome: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(12, 'Senha deve ter pelo menos 12 caracteres'),
  nivel: z.string(),
  cargo: z.string(),
  plan: z.string().optional().default('free'),
});

/**
 * Realiza login do usuário baseado em username e password.
 */
export async function loginAction(
  input: z.infer<typeof loginSchema>
): Promise<ActionResponse<{ mfaRequired?: boolean, mfaSetupRequired?: boolean }>> {
  try {
    const { username, password } = loginSchema.parse(input);
    const supabase = await createClient();

    // 1. Buscar o email associado ao username
    const { data: userEmail, error: rpcError } = await supabase
      .rpc('get_email_by_username', { username_input: username });

    if (rpcError || !userEmail) {
      return createErrorResponse('Usuário não encontrado ou sem email associado');
    }

    // 2. Fazer login
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password,
    });

    if (error || !session) {
      if (error?.message?.includes('Email not confirmed') || error?.code === 'email_not_confirmed') {
        return createErrorResponse('Email não confirmado. Verifique sua caixa de entrada.');
      }
      return createErrorResponse('Usuário ou senha incorretos');
    }

    // 3. Verificar MFA
    const { data: factors } = await supabase.auth.mfa.listFactors();
    const hasVerifiedFactor = factors?.totp.some(f => f.status === 'verified');
    
    // Se o usuário tem intenção de MFA (pelo perfil) mas resetamos os fatores, forçamos setup.
    const mfaEnabledInProfile = session.user.user_metadata?.mfa_enabled === true;

    if (mfaEnabledInProfile && !hasVerifiedFactor) {
      return createSuccessResponse({ mfaSetupRequired: true });
    }

    return createSuccessResponse({ mfaRequired: !!hasVerifiedFactor });
  } catch (error: any) {
    console.error('[loginAction] Erro inesperado:', {
      error,
      message: error.message,
      stack: error.stack
    });
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.issues[0].message);
    }
    return createErrorResponse(error.message || 'Erro ao fazer login');
  }
}

/**
 * Registra um novo usuário.
 */
export async function registerAction(
  input: z.infer<typeof registerSchema>,
  origin: string
): Promise<ActionResponse<any>> {
  try {
    const validated = registerSchema.parse(input);
    const supabase = await createClient();

    // Check username
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', validated.username)
      .single();

    if (existingUser) {
      return createErrorResponse('Nome de usuário já está em uso.');
    }

    // Sign up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
      options: {
        data: {
          nome: validated.nome,
          username: validated.username,
          nivel: validated.nivel,
          cargo: validated.cargo,
          plan: validated.plan,
        },
        emailRedirectTo: `${origin}/auth/callback`,
      }
    });

    if (authError) return createErrorResponse(authError.message);

    return createSuccessResponse({
      id: authData.user?.id,
      email: authData.user?.email,
      username: validated.username,
      nome: validated.nome,
      nivel: validated.nivel,
      cargo: validated.cargo,
      plan: validated.plan
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.issues[0].message);
    }
    return createErrorResponse(error.message || 'Erro ao registrar usuário');
  }
}

/**
 * Logout do usuário.
 */
export async function logoutAction(): Promise<ActionResponse<boolean>> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return createSuccessResponse(true);
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro ao fazer logout');
  }
}

/**
 * Recupera dados do usuário atual logado.
 */
export async function getCurrentUserAction(): Promise<ActionResponse<any>> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return createErrorResponse('Não autenticado');
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.warn('Profile not found, using metadata fallback.');
      return createSuccessResponse({
        id: user.id,
        email: user.email,
        nome: user.user_metadata.nome,
        nivel: user.user_metadata.nivel,
        cargo: user.user_metadata.cargo,
        plan: user.user_metadata.plan,
        xp: 0,
        questoes_geradas: 0,
        user_metadata: user.user_metadata
      });
    }

    return createSuccessResponse({
      ...profile,
      email: user.email,
      user_metadata: user.user_metadata
    });
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro ao buscar usuário');
  }
}

/**
 * Verifica código MFA. Pode ser usado para login ou para ativar um novo fator.
 */
export async function verify2FAAction(code: string, factorId?: string): Promise<ActionResponse<any>> {
  try {
    if (!code) return createErrorResponse('Código é obrigatório');
    
    const supabase = await createClient();
    
    let targetFactorId = factorId;

    if (!targetFactorId) {
      const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) return createErrorResponse('Erro ao recuperar fatores MFA');
      
      const totpFactor = factors.totp.find(f => f.status === 'verified');
      if (!totpFactor) return createErrorResponse('Nenhum fator MFA verificado');
      targetFactorId = totpFactor.id;
    }

    const { data, error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
      factorId: targetFactorId,
      code
    });

    if (verifyError) return createErrorResponse('Código inválido ou expirado');

    return createSuccessResponse(data);
  } catch (error: any) {
    console.error('[verify2FAAction] Erro inesperado:', {
      error,
      message: error.message,
      stack: error.stack
    });
    return createErrorResponse(error.message || 'Erro na verificação MFA');
  }
}

/**
 * Inicia o processo de enrollment de MFA (TOTP).
 */
export async function enrollMFAAction(friendlyName?: string): Promise<ActionResponse<{ id: string; totp: { secret: string; uri: string } }>> {
  try {
    const supabase = await createClient();
    
    // Check existing factors
    const { data: factors } = await supabase.auth.mfa.listFactors();
    if (factors) {
      // Unenroll unverified factors to avoid conflicts
      const unverifiedFactors = factors.totp.filter(f => (f.status as string) === 'unverified');
      for (const factor of unverifiedFactors) {
        await supabase.auth.mfa.unenroll({ factorId: factor.id });
      }
    }

    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: friendlyName || `Petrobras Quest (${new Date().toLocaleTimeString()})`,
    });

    if (error) return createErrorResponse(error.message);

    return createSuccessResponse(data as any);
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro ao iniciar enrollment MFA');
  }
}

/**
 * Desativa o MFA (TOTP) para o usuário.
 */
export async function unenrollMFAAction(factorId: string): Promise<ActionResponse<boolean>> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.mfa.unenroll({ factorId });
    
    if (error) return createErrorResponse(error.message);
    
    return createSuccessResponse(true);
  } catch (error: any) {
    console.error('[unenrollMFAAction] Erro inesperado:', {
      error,
      message: error.message,
      stack: error.stack
    });
    return createErrorResponse(error.message || 'Erro ao desativar MFA');
  }
}

/**
 * Reseta o MFA do usuário logado (usado quando usuário perde acesso ao app).
 * Remove todos os fatores TOTP e atualiza metadata.
 */
export async function reset2FAAction(): Promise<ActionResponse<boolean>> {
  try {
    const supabase = await createClient();
    
    // 1. Obter usuário (deve estar logado com senha pelo menos)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('[reset2FAAction] Usuário não encontrado:', userError);
      return createErrorResponse('Usuário não autenticado');
    }

    // 2. Listar e remover todos os fatores
    const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
    if (factorsError) {
      console.error('[reset2FAAction] Erro ao listar fatores:', factorsError);
      return createErrorResponse('Erro ao listar fatores MFA');
    }

    const allFactors = [...factors.totp, ...factors.phone];
    for (const factor of allFactors) {
      const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId: factor.id });
      if (unenrollError) {
        console.warn(`[reset2FAAction] Não foi possível remover fator ${factor.id}:`, unenrollError);
        // Continuamos tentando remover os outros
      }
    }

    // 3. Atualizar metadata no Auth
    const { error: updateAuthError } = await supabase.auth.updateUser({
      data: { mfa_enabled: false }
    });

    if (updateAuthError) {
      console.error('[reset2FAAction] Erve ao atualizar metadata auth:', updateAuthError);
    }

    // 4. Atualizar perfil na tabela profiles (se existir a coluna)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ mfa_enabled: false })
      .eq('id', user.id);

    if (profileError) {
      console.warn('[reset2FAAction] Erro ao atualizar profile:', profileError);
    }

    console.log(`[reset2FAAction] MFA resetado com sucesso para usuário: ${user.id}`);
    return createSuccessResponse(true);
  } catch (error: any) {
    console.error('[reset2FAAction] Erro crítico:', error);
    return createErrorResponse(error.message || 'Erro ao resetar MFA');
  }
}
