require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function resetPassword() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error('Missing Supabase URL or Service Role Key in .env.local');
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });

    const userId = 'e2e3d5cd-d37c-41dd-971e-9d885a6b4737';
    const newPassword = '123456';

    const { data, error } = await supabase.auth.admin.updateUserById(
        userId,
        { password: newPassword }
    );

    if (error) {
        console.error('Error updating user password:', error);
    } else {
        console.log('Password updated successfully for user:', data.user.email);
    }
}

resetPassword();
