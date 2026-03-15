const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

async function upgrade() {
  console.log('Reading env...');
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const env = envContent.split('\n').reduce((acc, line) => {
    const match = line.match(/^\s*([^#\s]+)\s*=\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim().replace(/^["']|["']$/g, '');
      acc[key] = value;
    }
    return acc;
  }, {});

  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error('Missing URL or KEY');
    process.exit(1);
  }

  const supabase = createClient(url, key);
  
  console.log('Querying user andrehugofernandes...');
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', 'andrehugofernandes')
    .single();

  if (error) {
    console.error('Error finding user:', error.message);
    process.exit(1);
  }

  console.log('User found:', data.id);
  
  console.log('Updating plan to Ouro...');
  const { error: updError } = await supabase
    .from('profiles')
    .update({ plan: 'Ouro' })
    .eq('id', data.id);

  if (updError) {
    console.error('Update failed:', updError.message);
    process.exit(1);
  }

  console.log('PLAN_UPGRADE_SUCCESSFUL');
  process.exit(0);
}

upgrade().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
