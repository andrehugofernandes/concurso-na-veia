import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Faltam variáveis de ambiente.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  const { data, error: searchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', 'andre.hugo');

  if (searchError) {
    console.error('Erro ao buscar:', searchError);
    return;
  }
  
  if (!data || data.length === 0) {
     console.error('Usuário não encontrado.');
     return;
  }
  
  const user = data[0];
  console.log(`Atualizando usuário: ${user.username} (${user.id})`);

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ plan: 'vitalis-total', role: 'sysadmin' })
    .eq('id', user.id);

  if (updateError) {
    console.error('Erro ao atualizar plano no profiles:', updateError);
  } else {
    console.log('Plano atualizado em profiles para vitalis-total com sucesso!');
  }

  // Tentar atualizar em subscriptions também se existir
  const { error: subError } = await supabase
    .from('subscriptions')
    .update({ plan: 'vitalis-total', status: 'active' })
    .eq('user_id', user.id);
    
  if (subError) {
    console.log('Sem assinatura ativa para atualizar, ou ocorreu erro:', subError.message);
  } else {
    console.log('Assinatura atualizada em subscriptions para vitalis-total!');
  }
}

run();
