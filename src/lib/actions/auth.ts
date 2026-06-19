'use server';

import { z } from 'zod';
import { createClient, createAdminClient } from '@/lib/supabase/server';
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
  concurso: z.string().optional().default('petrobras'),
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
      console.log(`[AUTH_DEBUG] Falha de login para ${username}: ${error?.message || 'Sem sessão'}`);
      
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

    // Log de Time Drift para diagnóstico
    console.log(`[AUTH_DEBUG] Login processado para ${username}. MFA Profile: ${mfaEnabledInProfile}. Total Fatores: ${factors?.totp?.length}`);

    if (mfaEnabledInProfile && !hasVerifiedFactor) {
      return createSuccessResponse({ mfaSetupRequired: true });
    }

    return createSuccessResponse({ mfaRequired: !!hasVerifiedFactor });
  } catch (error: any) {
    console.error(`[AUTH_DEBUG] [TIME: ${new Date().toISOString()}] Erro inesperado no login:`, error.message);
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
          concurso: validated.concurso,
          mfa_enabled: true,
        },
        emailRedirectTo: `${origin}/auth/callback`,
      }
    });

    if (authError) return createErrorResponse(authError.message);

    // Auto-confirm email if registration was successful
    if (authData.user) {
      try {
        const adminSupabase = await createAdminClient();
        await adminSupabase.auth.admin.updateUserById(authData.user.id, {
          email_confirm: true,
          user_metadata: { ...authData.user.user_metadata, mfa_enabled: true }
        });
        
        // Ativar flag no perfil também
        await adminSupabase.from('profiles').update({ mfa_enabled: true }).eq('id', authData.user.id);
        
        console.log(`[AUTH_DEBUG] User auto-confirmed and MFA enforced: ${authData.user.id}`);
      } catch (confirmError) {
        console.error('[AUTH_DEBUG] Failed to auto-confirm user:', confirmError);
        // We don't fail the action here, the user can still confirm via email if the admin call failed
      }
    }

    return createSuccessResponse({
      id: authData.user?.id,
      email: authData.user?.email,
      username: validated.username,
      nome: validated.nome,
      nivel: validated.nivel,
      cargo: validated.cargo,
      plan: validated.plan,
      concurso: validated.concurso
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
  const serverTime = new Date();
  console.log(`[AUTH_DEBUG] [TIMESTAMP: ${serverTime.getTime()}] Verificando código OTP: ${code}`);
  try {
    if (!code) return createErrorResponse('Código é obrigatório');
    
    const supabase = await createClient();
    
    // Obter usuário para logar ID
    const { data: { user } } = await supabase.auth.getUser();
    console.log(`[AUTH_DEBUG] Usuário executando challenge OTP: ${user?.id || 'Desconhecido'}`);

    let targetFactorId = factorId;

    if (!targetFactorId) {
      const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) {
          console.log(`[AUTH_DEBUG] Erro listar fatores: ${factorsError.message}`);
          return createErrorResponse('Erro ao recuperar fatores MFA');
      }
      
      const totpFactor = factors.totp.find(f => f.status === 'verified');
      if (!totpFactor) {
          console.log('[AUTH_DEBUG] Nenhum fator verificado encontrado');
          return createErrorResponse('Nenhum fator MFA verificado');
      }
      targetFactorId = totpFactor.id;
    }

    console.log(`[AUTH_DEBUG] Desafiando fator: ${targetFactorId}`);

    const { data, error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
      factorId: targetFactorId,
      code
    });

    if (verifyError) {
        console.log(`[AUTH_DEBUG] DESSINCRONIZAÇÃO DE OTP OU CÓDIGO INVÁLIDO. Detalhes: ${verifyError.message}`);
        return createErrorResponse('Código inválido ou expirado. Verifique a hora do seu celular.');
    }

    console.log('[AUTH_DEBUG] OTP verificado com sucesso');
    return createSuccessResponse({ success: true, verifiedAt: new Date().toISOString() });
  } catch (error: any) {
    console.log(`[AUTH_DEBUG] Erro inesperado em verify2FAAction: ${error.message}`);
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
      friendlyName: `AVAGAEHMINHA (${Date.now()})`,
    });

    if (error) return createErrorResponse(error.message);

    // Retorna explicitamente um Plain Object para a Server Action
    return createSuccessResponse({
      id: data.id,
      totp: {
        secret: data.totp.secret,
        uri: data.totp.uri,
        qr_code: data.totp.qr_code
      }
    });
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
  console.log(`[AUTH_DEBUG] Iniciando RESET de 2FA via ADMIN...`);
  try {
    const supabase = await createClient();
    const adminSupabase = await createAdminClient();
    
    // 1. Obter usuário (precisa estar logado pelo menos com senha - AAL1)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.log(`[AUTH_DEBUG] Usuário não encontrado para reset: ${userError?.message}`);
      return createErrorResponse('Sessão inválida. Faça login novamente.');
    }

    console.log(`[AUTH_DEBUG] Resetando MFA para usuário: ${user.id} (${user.email})`);

    // 2. Listar fatores via Admin API
    const { data: adminFactors, error: factorsError } = await adminSupabase.auth.admin.mfa.listFactors({
        userId: user.id
    });

    if (factorsError) {
      console.log(`[AUTH_DEBUG] Erro Admin listFactors: ${factorsError.message}`);
      return createErrorResponse('Erro ao acessar base de autenticação (Admin)');
    }

    console.log(`[AUTH_DEBUG] Fatores encontrados: ${adminFactors?.factors?.length || 0}`);

    // 3. Remover fatores encontrados
    if (adminFactors?.factors) {
        for (const factor of adminFactors.factors) {
            console.log(`[AUTH_DEBUG] Deletando fator ADMIN: ${factor.id} (${factor.friendly_name})`);
            const { error: delError } = await adminSupabase.auth.admin.mfa.deleteFactor({
                id: factor.id,
                userId: user.id
            });
            if (delError) {
              console.log(`[AUTH_DEBUG] Falha ao deletar fator ${factor.id}: ${delError.message}`);
            }
        }
    }

    // 4. Garantir que o Setup seja exigido no próximo login
    console.log('[AUTH_DEBUG] Mantendo intenção de MFA na conta para forçar novo Setup...');
    await adminSupabase.auth.admin.updateUserById(user.id, {
        user_metadata: { mfa_enabled: true }
    });

    await adminSupabase.from('profiles').update({ mfa_enabled: true }).eq('id', user.id);

    console.log(`[AUTH_DEBUG] 2FA Resetado com Sucesso!`);
    
    // IMPORTANTE: Retornando um booleano simples dentro da resposta
    return createSuccessResponse(true);
  } catch (error: any) {
    console.log(`[AUTH_DEBUG] Falha Crítica no Reset: ${error.message}`);
    return createErrorResponse(error.message || 'Erro ao resetar MFA');
  }
}

