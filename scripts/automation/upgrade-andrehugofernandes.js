#!/usr/bin/env node

/**
 * Script para atualizar cargo do usuário andrehugofernandes para suprimento-adm
 * MCP MVP: Dashboard de blocos para Técnico de Suprimento
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nqqyetymjvgstsbsxdkq.supabase.co';
// Use service role key for admin operations
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcXlldHltanZnc3RzYnN4ZGtxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDU3OTY3MywiZXhwIjoyMDg2MTU1NjczfQ.mOzEQ6ck1vVqDy2E2SIRyKtPtWz3k-YeVAip_QrjyQQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateUserCargo() {
    try {
        console.log('🔄 Atualizando cargo do usuário andrehugofernandes para suprimento-adm...\n');

        // 1. Buscar usuário por username
        console.log('1️⃣ Buscando usuário...');
        const { data: { users }, error: searchError } = await supabase.auth.admin.listUsers();

        if (searchError) {
            console.error('❌ Erro ao listar usuários:', searchError);
            return;
        }

        const user = users.find(u =>
            u.user_metadata?.username === 'andrehugofernandes' ||
            u.email === 'andrehugofernandes@example.com'
        );

        if (!user) {
            console.error('❌ Usuário andrehugofernandes não encontrado');
            return;
        }

        console.log(`✅ Usuário encontrado: ${user.id}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Username: ${user.user_metadata?.username}`);

        // 2. Atualizar user_metadata com cargo suprimento-adm
        console.log('\n2️⃣ Atualizando cargo em user_metadata...');
        const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
            user.id,
            {
                user_metadata: {
                    ...user.user_metadata,
                    cargo: 'suprimento-adm',
                    nivel: 'tecnico',
                    area: 'Logística, Suprimento e Química'
                }
            }
        );

        if (updateError) {
            console.error('❌ Erro ao atualizar user_metadata:', updateError);
            return;
        }

        console.log('✅ User metadata atualizado com sucesso');

        // 3. Atualizar profile (se usar Supabase profile table)
        console.log('\n3️⃣ Atualizando perfil na tabela profiles...');
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .update({
                cargo: 'suprimento-adm',
                nivel: 'tecnico'
            })
            .eq('id', user.id)
            .select();

        if (profileError) {
            console.warn('⚠️ Não foi possível atualizar tabela profiles:', profileError.message);
        } else {
            console.log('✅ Perfil atualizado com sucesso');
            console.log('   Cargo: suprimento-adm');
            console.log('   Nível: técnico');
        }

        // 4. Resumo final
        console.log('\n' + '='.repeat(60));
        console.log('✅ SUCESSO! Usuário atualizado para MVP suprimento-adm');
        console.log('='.repeat(60));
        console.log('\n📊 Blocos que aparecerão agora:');
        console.log('  1. BLOCO I - Administração (4 tópicos)');
        console.log('  2. BLOCO II - Legislação (Lei 13.303, RLCP)');
        console.log('  3. BLOCO III - Tributos (Contabilidade, Direito Tributário, Admin Tributária)');
        console.log('\n🎯 Próximos passos:');
        console.log('  1. Fazer login como andrehugofernandes');
        console.log('  2. Acessar /aulas para ver os blocos');
        console.log('  3. Clicar em cada bloco para acessar as aulas');
        console.log('  4. Completar o upgrade ULTIMATE das aulas de Tributos\n');

    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

updateUserCargo();
