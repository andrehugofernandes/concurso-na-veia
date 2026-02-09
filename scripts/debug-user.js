const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nqqyetymjvgstsbsxdkq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcXlldHltanZnc3RzYnN4ZGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1Nzk2NzMsImV4cCI6MjA4NjE1NTY3M30.53ojxslL2LDOREufYbMUrRfEq-B2AQaA2es6qUeDTN4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUser(username, password) {
    console.log(`Checking user: ${username}`);

    // 1. Get email by username
    const { data: email, error: rpcError } = await supabase
        .rpc('get_email_by_username', { username_input: username });

    if (rpcError) {
        console.error('RPC Error:', rpcError);
        return;
    }

    if (!email) {
        console.log('User not found via RPC (get_email_by_username returned null)');
        return;
    }

    console.log(`Email found via RPC: ${email}`);

    // 2. Try to sign in
    console.log('Attempting sign in...');
    const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (signInError) {
        console.error('Sign In Error:', signInError);
    } else {
        console.log('Sign In Successful!');
        console.log('User ID:', session.user.id);
    }
}

checkUser('izabellemariane0', 'BelleSophia@05');
