const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function parseEnv(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        if (!line || line.trim().startsWith('#')) return;
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim().replace(/['\"]/g, '');
            env[key] = value;
        }
    });
    return env;
}

const env = parseEnv(path.join(__dirname, '.env.local'));
const s = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function findMe() {
    console.log('--- 🔎 BUSCANDO USUÁRIO NO BANCO ---');
    
    // 1. Buscar no profiles por username ou email
    const { data: pEmail } = await s.from('profiles').select('*').eq('email', 'andrehugofernandes@gmail.com').single();
    const { data: pUser } = await s.from('profiles').select('*').eq('username', 'andrehugofernandes').single();
    
    if (pEmail || pUser) {
        console.log('✅ Achado na tabela profiles!');
        console.log(pEmail || pUser);
    } else {
        console.log('❌ Não achado na profiles. Tentando listar alguns...');
        const { data: list } = await s.from('profiles').select('nome, username').limit(5);
        console.log('Lista rápida:', list);
    }
    
    // 2. Buscar no Auth (se possível listar por email)
    console.log('\n--- 🔑 BUSCANDO NO AUTH ---');
    const { data: auth, error } = await s.auth.admin.listUsers();
    
    if (auth && auth.users) {
        const u = auth.users.find(x => x.email === 'andrehugofernandes@gmail.com');
        if (u) {
            console.log('✅ Achado no Auth!');
            console.log('Metadata:', u.user_metadata);
            console.log('ID:', u.id);
        } else {
            console.log('❌ Usuário não achado no Auth por email.');
            console.log('Alguns emails no Auth:', auth.users.map(x => x.email));
        }
    } else {
        console.error('❌ Erro ao listar Auth:', error?.message);
    }
}

findMe();
