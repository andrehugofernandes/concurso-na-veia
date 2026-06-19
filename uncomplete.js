const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('aulas_progress')
    .update({ completed: false, progress_percent: 0, xp_awarded: 0 })
    .eq('materia_id', 'portugues')
    .eq('topico_id', 'crase');

  if (error) {
    console.error('Error updating:', error);
  } else {
    console.log('Successfully unmarked as completed!');
  }
}
run();
