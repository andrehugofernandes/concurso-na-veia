import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
import { createAdminClient } from '../src/lib/supabase/server';

async function reset() {
  const supabase = await createAdminClient();
  const username = 'andrehugofernandes';

  console.log(`Buscando ID para o usuário: ${username}...`);
  
  // 1. Get User ID
  const { data: profile, error: profileErr } = await supabase
    .from('profiles')
    .select('id, email')
    .eq('username', username)
    .single();

  if (profileErr || !profile) {
    console.error('Erro ao buscar perfil:', profileErr);
    return;
  }

  const userId = profile.id;
  console.log(`ID encontrado: ${userId}. Faxina nos fatores MFA iniciada...`);

  // 2. List and Delete Factors via Admin API
  const { data: factors, error: listErr } = await supabase.auth.admin.mfa.listFactors({
    userId: userId
  });

  if (listErr) {
    console.error('Erro ao listar fatores:', listErr);
  } else if (factors && factors.factors) {
    for (const factor of factors.factors) {
      console.log(`Removendo fator: ${factor.id} (${factor.friendly_name})`);
      const { error: delErr } = await supabase.auth.admin.mfa.deleteFactor({
        id: factor.id,
        userId: userId
      });
      if (delErr) console.error(`Erro ao deletar ${factor.id}:`, delErr.message);
    }
  }

  // 3. Force Metadata to require setup
  console.log('Atualizando metadados para forçar novo setup...');
  const { error: updateErr } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { mfa_enabled: true } 
  });

  if (updateErr) console.error('Erro ao atualizar metadata:', updateErr);

  // 4. Update public.profiles
  await supabase.from('profiles').update({ mfa_enabled: true }).eq('id', userId);

  console.log('✅ RESET COMPLETO. O usuário agora será forçado a escanear o QR Code no próximo login.');
}

reset();
