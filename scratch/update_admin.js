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

async function updateAdminEmail() {
  const adminId = '28cea130-e35c-4cff-b382-6d71361f4707'; // ID do admin
  const newEmail = 'andrehugo.secti@gmail.com'; // O email fallback solicitado pelo usuário

  console.log(`Atualizando email do admin para: ${newEmail}...`);

  const { data, error } = await supabase.auth.admin.updateUserById(adminId, {
    email: newEmail,
    email_confirm: true 
  });

  if (error) {
    console.error("Erro ao atualizar o email:", error.message);
  } else {
    console.log("✅ Email atualizado com sucesso!");
    console.log(`Novo Email: ${data.user.email}`);
  }
}

updateAdminEmail();
