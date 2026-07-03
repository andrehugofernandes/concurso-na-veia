const fs = require('fs');
const dotenv = require('dotenv');
// Carrega as variáveis do .env.local
const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function createAdmin() {
  console.log("Criando usuário no Supabase...");
  // Supabase requer um e-mail. Usaremos um e-mail baseado no username fornecido.
  const email = 'andre.hugo@admin.com';
  
  const { data: user, error: authError } = await supabase.auth.admin.createUser({
    email: email,
    password: 'Mvvas@18261405',
    email_confirm: true, // Já confirma o e-mail para não precisar de verificação
    user_metadata: {
      first_name: 'Andre',
      last_name: 'Hugo'
    }
  });

  if (authError) {
    console.error("Erro ao criar usuário na Autenticação:", authError.message);
    return;
  }

  console.log(`Usuário criado na Autenticação com ID: ${user.user.id}`);
  console.log("Atualizando perfil para a role de Admin...");

  // Espera um segundo para garantir que as triggers do Supabase (se houver) criem a linha na public.profiles
  await new Promise(r => setTimeout(r, 1000));

  // Atualizar a role para 'admin' na tabela public.profiles
  const { error: dbError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.user.id);

  if (dbError) {
    console.error("Erro ao atualizar o perfil para admin:", dbError.message);
  } else {
    console.log("✅ Usuário Admin criado com sucesso!");
    console.log(`Email de login: ${email}`);
    console.log(`Senha: Mvvas@18261405`);
  }
}

createAdmin();
