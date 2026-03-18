'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';

export async function reset2FAAction(): Promise<{ success: boolean; error?: string }> {
  console.log('[RESET_2FA] Iniciando reset via Admin API...');
  try {
    const supabase = await createClient();
    const adminSupabase = await createAdminClient();

    // 1. Obter usuário logado (AAL1 é suficiente)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.log('[RESET_2FA] Usuário não encontrado:', userError?.message);
      return { success: false, error: 'Sessão inválida. Faça login novamente.' };
    }

    console.log(`[RESET_2FA] Resetando MFA para: ${user.id}`);

    // 2. Listar fatores via Admin API
    const { data: adminFactors, error: factorsError } = await adminSupabase.auth.admin.mfa.listFactors({
      userId: user.id
    });

    if (factorsError) {
      console.log('[RESET_2FA] Erro ao listar fatores:', factorsError.message);
      return { success: false, error: 'Erro ao acessar fatores MFA.' };
    }

    console.log(`[RESET_2FA] Fatores encontrados: ${adminFactors?.factors?.length || 0}`);

    // 3. Remover todos os fatores via Admin
    if (adminFactors?.factors) {
      for (const factor of adminFactors.factors) {
        console.log(`[RESET_2FA] Deletando fator: ${factor.id}`);
        const { error: delError } = await adminSupabase.auth.admin.mfa.deleteFactor({
          id: factor.id,
          userId: user.id
        });
        if (delError) {
          console.log(`[RESET_2FA] Falha ao deletar ${factor.id}: ${delError.message}`);
        }
      }
    }

    // 4. Manter mfa_enabled=true para forçar novo setup
    await adminSupabase.auth.admin.updateUserById(user.id, {
      user_metadata: { mfa_enabled: true }
    });
    await adminSupabase.from('profiles').update({ mfa_enabled: true }).eq('id', user.id);

    console.log('[RESET_2FA] Reset concluído com sucesso!');
    return { success: true };
  } catch (error: any) {
    console.error('[RESET_2FA] Erro crítico:', error.message);
    return { success: false, error: error.message || 'Erro ao resetar MFA' };
  }
}
