const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Faltam variáveis de ambiente no .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function listFiles() {
  const { data, error } = await supabase.storage
    .from('petropbras-quest')
    .list('', { limit: 100 });

  if (error) {
    console.error("Erro ao listar:", error);
    process.exit(1);
  }

  console.log("Arquivos na raiz do bucket:");
  console.log(JSON.stringify(data, null, 2));

  // Tenta listar subpasta podcasts
  const { data: dataPod, error: errorPod } = await supabase.storage
    .from('petropbras-quest')
    .list('podcasts', { limit: 100 });

  if (!errorPod) {
    console.log("Arquivos na pasta podcasts:");
    console.log(JSON.stringify(dataPod, null, 2));
  }
}

listFiles();
