import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testVitalicio() {
  const testEmail = 'andrehugo.secti@gmail.com';
  
  // Test 'vitalicio'
  const { data: d1, error: e1 } = await supabase
    .from('profiles')
    .update({ plan: 'vitalicio' })
    .eq('email', testEmail)
    .select('id, email, plan, role');

  console.log("Plan 'vitalicio':", e1 ? `FAILED: ${e1.message}` : d1);

  // Try updating check constraint or alter table via rpc or SQL if available
  // If e1 failed, we can alter the constraint using raw SQL query if postgres rpc is available
}

testVitalicio();
