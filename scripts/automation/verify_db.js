
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function parseEnv(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error('.env.local not found');
        process.exit(1);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        // Basic parsing, skipping comments and empty lines
        if (!line || line.trim().startsWith('#')) return;

        // Split by first equals sign
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join('=').trim(); // Re-join in case value contains =

            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            env[key] = value;
        }
    });
    return env;
}

const envPath = path.join(__dirname, '.env.local');
console.log('Reading env from:', envPath);
const envConfig = parseEnv(envPath);

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    console.log('Found keys:', Object.keys(envConfig));
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSchema() {
    console.log('Connecting to Supabase at:', supabaseUrl);

    const tables = [
        'profiles',
        'cargos',
        'materias',
        'questoes'
    ];

    console.log('\nVerifying table access...');

    for (const table of tables) {
        const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });

        if (error) {
            if (error.code === '42P01') {
                console.error(`❌ Table '${table}' DOES NOT EXIST.`);
            } else {
                // RLS might block select *, but usually we can still get an error code or empty result
                console.error(`⚠️  Access issue with '${table}': ${error.message} (Code: ${error.code})`);
            }
        } else {
            console.log(`✅ Table '${table}' exists. Count: ${count}`);
        }
    }
}

inspectSchema();
