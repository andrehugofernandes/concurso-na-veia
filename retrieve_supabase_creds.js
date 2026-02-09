
const https = require('https');

const token = process.argv[2];

if (!token) {
    console.error('Usage: node retrieve_supabase_creds.js <token>');
    process.exit(1);
}

function request(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.supabase.com',
            path: path,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'Node.js Script'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(new Error('Invalid JSON response'));
                    }
                } else {
                    reject(new Error(`Status Code: ${res.statusCode} - ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function main() {
    try {
        console.log('Fetching projects...');
        const projects = await request('/v1/projects');

        if (projects.length === 0) {
            console.log('No projects found.');
            return;
        }

        let project = projects.find(p => p.name.toLowerCase().includes('petrobras'));
        if (!project) {
            console.log('Project "petrobras" not found, using first available project.');
            project = projects[0];
        }

        console.log(`Selected Project: ${project.name} (${project.id})`);

        console.log('Fetching API keys...');
        const keys = await request(`/v1/projects/${project.id}/api-keys`);

        // Fix: Access api_key property, not key
        const anonKey = keys.find(k => k.name === 'anon' || k.name === 'public' || (k.api_key && k.api_key.startsWith('sb_publishable')))?.api_key || keys.find(k => k.tags === 'anon')?.api_key;
        const serviceRoleKey = keys.find(k => k.name === 'service_role' || (k.api_key && k.api_key.startsWith('sb_secret')))?.api_key;

        if (!anonKey) {
            console.error('Could not find anon key.');
            console.log('Keys found:', JSON.stringify(keys, null, 2)); // Debugging
            return;
        }

        const output = `
NEXT_PUBLIC_SUPABASE_URL=https://${project.ref || project.id}.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}
# SERVICE_ROLE_KEY=${serviceRoleKey}
`;

        const fs = require('fs');
        fs.writeFileSync('.env.local', output);
        console.log('.env.local file updated with latest keys!');
        console.log(`Anon Key Prefix: ${anonKey.substring(0, 15)}...`);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
