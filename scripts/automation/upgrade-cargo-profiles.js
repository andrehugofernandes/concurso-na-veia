#!/usr/bin/env node

/**
 * Script para atualizar cargo na tabela profiles
 * MCP MVP: Dashboard de blocos para Técnico de Suprimento
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nqqyetymjvgstsbsxdkq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcXlldHltanZnc3RzYnN4ZGtxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDU3OTY3MywiZXhwIjoyMDg2MTU1NjczfQ.mOzEQ6ck1vVqDy2E2SIRyKtPtWz3k-YeVAip_QrjyQQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateCargo() {
    try {
        console.log('🔄 Atualizando cargo na tabela profiles...\n');

        // 1. Buscar profile por username ou email
        console.log('1️⃣ Buscando profile de andrehugofernandes...');
        const { data: profiles, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .or('username.eq.andrehugofernandes,email.eq.andrehugofernandes@example.com')
            .limit(1);

        if (fetchError) {
            console.error('❌ Erro ao buscar profile:', fetchError);
            return;
        }

        if (!profiles || profiles.length === 0) {
            console.log('⚠️ Profile não encontrado. Tentando buscar todos os profiles...');
            const { data: allProfiles, error: allError } = await supabase
                .from('profiles')
                .select('id, username, email, cargo')
                .limit(10);

            if (allError) {
                console.error('❌ Erro ao listar profiles:', allError);
                return;
            }

            if (allProfiles) {
                console.log('\n📋 Profiles existentes:');
                allProfiles.forEach(p => {
                    console.log(`  - ${p.username || p.email} (cargo: ${p.cargo || 'não definido'})`);
                });
            }
            return;
        }

        const profile = profiles[0];
        console.log(`✅ Profile encontrado:`);
        console.log(`   ID: ${profile.id}`);
        console.log(`   Username: ${profile.username}`);
        console.log(`   Email: ${profile.email}`);
        console.log(`   Cargo atual: ${profile.cargo || 'não definido'}`);

        // 2. Atualizar cargo
        console.log('\n2️⃣ Atualizando cargo para suprimento-adm...');
        const { data: updated, error: updateError } = await supabase
            .from('profiles')
            .update({
                cargo: 'suprimento-adm',
                nivel: 'tecnico'
            })
            .eq('id', profile.id)
            .select();

        if (updateError) {
            console.error('❌ Erro ao atualizar cargo:', updateError);
            return;
        }

        console.log('✅ Cargo atualizado com sucesso!');
        console.log(`   Novo cargo: ${updated[0].cargo}`);
        console.log(`   Nível: ${updated[0].nivel}`);

        // 3. Resumo final
        console.log('\n' + '='.repeat(60));
        console.log('✅ SUCESSO! MVP suprimento-adm ativado');
        console.log('='.repeat(60));
        console.log('\n📊 Blocos que aparecerão agora em /aulas:');
        console.log('  • BLOCO I - Administração (4 tópicos)');
        console.log('  • BLOCO II - Legislação (Lei 13.303, RLCP)');
        console.log('  • BLOCO III - Tributos (Contabilidade, Direito Tributário, Admin Tributária)');
        console.log('\n🎯 Próximos passos:');
        console.log('  1. ✅ Fazer login como andrehugofernandes');
        console.log('  2. 📍 Acessar http://localhost:3000/aulas');
        console.log('  3. 📚 Ver os 3 blocos exibidos');
        console.log('  4. 🚀 Começar a estudar!\n');

    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

updateCargo();
