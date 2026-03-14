import { createClient } from './src/lib/supabase/server';

async function checkAvatars() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url')
    .limit(10);

  if (error) {
    console.error('Error fetching profiles:', error);
    return;
  }

  console.log('Profiles Found:');
  console.table(data);
}

checkAvatars();
