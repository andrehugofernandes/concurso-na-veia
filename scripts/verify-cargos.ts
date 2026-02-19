import { PROFISSOES } from '../src/lib/profissoes-edital';
import { CARGO_ID_MAP } from '../src/lib/cargos-map';

console.log('--- Verificando Mapeamento de Cargos ---');

let missing = 0;
PROFISSOES.forEach(p => {
    if (!CARGO_ID_MAP[p.id]) {
        console.error(`❌ FALTANDO: ${p.id} (${p.nome})`);
        missing++;
    } else {
        console.log(`✅ OK: ${p.id} -> ${CARGO_ID_MAP[p.id]}`);
    }
});

if (CARGO_ID_MAP['administracao'] === 'administracao') {
    console.log('✅ RESOLUÇÃO: "administracao" agora aponta corretamente para Nível Superior.');
} else {
    console.error('❌ ERRO: "administracao" ainda não aponta para Superior.');
}

if (missing === 0) {
    console.log('\n✨ Todos os cargos do edital estão mapeados com sucesso!');
} else {
    console.error(`\n⚠️ Total de cargos faltantes: ${missing}`);
    process.exit(1);
}
