
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  console.log('[API_RESET_2FA] Iniciando reset via API segura...');
  try {
    const supabase = await createClient();
    const adminSupabase = await createAdminClient();

    // 1. Obter usuário logado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Sessão inválida.' }, { status: 401 });
    }

    // 2. Listar fatores via Admin
    const { data: adminFactors } = await adminSupabase.auth.admin.mfa.listFactors({
      userId: user.id
    });

    // 3. Remover todos os fatores
    if (adminFactors?.factors) {
      for (const factor of adminFactors.factors) {
        await adminSupabase.auth.admin.mfa.deleteFactor({ id: factor.id, userId: user.id });
      }
    }

    // 4. Reset metadata
    await adminSupabase.auth.admin.updateUserById(user.id, {
      user_metadata: { mfa_enabled: true }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
