const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const users = [
  // Nível Técnico (medio)
  { username: 'andrehugo-operacao-tec', email: 'andrehugo-operacao-tec@test.com', nome: 'Andre Hugo - Operacao Tec', nivel: 'medio', cargo: 'operacao', plan: 'elite-medio' },
  { username: 'andrehugo-manutencao-mecanica-tec', email: 'andrehugo-manutencao-mecanica-tec@test.com', nome: 'Andre Hugo - Manutencao Mecanica Tec', nivel: 'medio', cargo: 'manutencao-mecanica', plan: 'elite-medio' },
  { username: 'andrehugo-manutencao-eletrica-tec', email: 'andrehugo-manutencao-eletrica-tec@test.com', nome: 'Andre Hugo - Manutencao Eletrica Tec', nivel: 'medio', cargo: 'manutencao-eletrica', plan: 'elite-medio' },
  { username: 'andrehugo-manutencao-instrumentacao-tec', email: 'andrehugo-manutencao-instrumentacao-tec@test.com', nome: 'Andre Hugo - Manutencao Instrumentacao Tec', nivel: 'medio', cargo: 'manutencao-instrumentacao', plan: 'elite-medio' },
  { username: 'andrehugo-enfermagem-trabalho-tec', email: 'andrehugo-enfermagem-trabalho-tec@test.com', nome: 'Andre Hugo - Enfermagem Trabalho Tec', nivel: 'medio', cargo: 'enfermagem-trabalho', plan: 'elite-medio' },
  { username: 'andrehugo-seguranca-tec', email: 'andrehugo-seguranca-tec@test.com', nome: 'Andre Hugo - Seguranca Tec', nivel: 'medio', cargo: 'seguranca', plan: 'elite-medio' },
  { username: 'andrehugo-administracao-tec', email: 'andrehugo-administracao-tec@test.com', nome: 'Andre Hugo - Administracao Tec', nivel: 'medio', cargo: 'administracao', plan: 'elite-medio' },
  { username: 'andrehugo-logistica-tec', email: 'andrehugo-logistica-tec@test.com', nome: 'Andre Hugo - Logistica Tec', nivel: 'medio', cargo: 'logistica', plan: 'elite-medio' },
  { username: 'andrehugo-quimica-tec', email: 'andrehugo-quimica-tec@test.com', nome: 'Andre Hugo - Quimica Tec', nivel: 'medio', cargo: 'quimica', plan: 'elite-medio' },
  // Nível Superior
  { username: 'andrehugo-eng-petroleo-sup', email: 'andrehugo-eng-petroleo-sup@test.com', nome: 'Andre Hugo - Eng Petroleo Sup', nivel: 'superior', cargo: 'eng-petroleo', plan: 'elite-superior' },
  { username: 'andrehugo-eng-mecanico-sup', email: 'andrehugo-eng-mecanico-sup@test.com', nome: 'Andre Hugo - Eng Mecanico Sup', nivel: 'superior', cargo: 'eng-mecanico', plan: 'elite-superior' },
  { username: 'andrehugo-eng-eletrico-sup', email: 'andrehugo-eng-eletrico-sup@test.com', nome: 'Andre Hugo - Eng Eletrico Sup', nivel: 'superior', cargo: 'eng-eletrico', plan: 'elite-superior' },
  { username: 'andrehugo-eng-civil-sup', email: 'andrehugo-eng-civil-sup@test.com', nome: 'Andre Hugo - Eng Civil Sup', nivel: 'superior', cargo: 'eng-civil', plan: 'elite-superior' },
  { username: 'andrehugo-analista-sistemas-sup', email: 'andrehugo-analista-sistemas-sup@test.com', nome: 'Andre Hugo - Analista de Sistemas Sup', nivel: 'superior', cargo: 'analista-sistemas', plan: 'elite-superior' },
  { username: 'andrehugo-analista-admin-sup', email: 'andrehugo-analista-admin-sup@test.com', nome: 'Andre Hugo - Analista Admin Sup', nivel: 'superior', cargo: 'analista-admin', plan: 'elite-superior' },
  { username: 'andrehugo-geologo-sup', email: 'andrehugo-geologo-sup@test.com', nome: 'Andre Hugo - Geologo Sup', nivel: 'superior', cargo: 'geologo', plan: 'elite-superior' },
  { username: 'andrehugo-economista-sup', email: 'andrehugo-economista-sup@test.com', nome: 'Andre Hugo - Economista Sup', nivel: 'superior', cargo: 'economista', plan: 'elite-superior' },
];

async function createAllUsers() {
  let ok = 0, fail = 0;

  for (const u of users) {
    const password = u.username;

    // Criar via Admin API
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: u.email,
      password: password,
      email_confirm: true,
      user_metadata: {
        nome: u.nome,
        username: u.username,
        nivel: u.nivel,
        cargo: u.cargo,
        plan: u.plan,
        full_name: u.nome,
        mfa_enabled: false,
      }
    });

    if (createError) {
      console.error(`ERRO [${u.username}]: ${createError.message}`);
      fail++;
      continue;
    }

    // Criar profile
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: newUser.user.id,
      username: u.username,
      email: u.email,
      nome: u.nome,
      nivel: u.nivel,
      cargo: u.cargo,
      plan: u.plan,
      xp: 0,
      nivel_jogador: 'Estagiario',
      questoes_certas: 0,
      questoes_erradas: 0,
      sequencia_atual: 0,
      maior_sequencia: 0,
      conquistas: [],
      questoes_geradas: 0,
    });

    if (profileError) {
      console.error(`  PROFILE ERRO [${u.username}]: ${profileError.message}`);
      fail++;
    } else {
      console.log(`OK [${u.username}]`);
      ok++;
    }
  }

  console.log(`\nResultado: ${ok} criados, ${fail} erros`);
}

createAllUsers();
