const fs = require("fs");
const path = require("path");

const aulasDir = path.join(__dirname, "../src/components/aulas/matematica");

function unlockAllModules(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  // Encontrar a função isModuleUnlocked
  const unlockedRegex = /const isModuleUnlocked = \(index: number\) => \{[\s\S]*?\};/;

  // Substituir pela versão desbloqueada (sempre retorna true)
  const replacement = `const isModuleUnlocked = (index: number) => {
    return true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS PARA VERIFICAÇÃO
  };`;

  if (unlockedRegex.test(content)) {
    content = content.replace(unlockedRegex, replacement);
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ ${path.basename(filePath)}`);
  } else {
    console.log(`⚠️  ${path.basename(filePath)} - padrão não encontrado`);
  }
}

const files = fs.readdirSync(aulasDir).filter(f => f.endsWith(".tsx"));
console.log(`\n🔓 Desbloqueando ${files.length} aulas de matemática...\n`);

files.forEach(file => unlockAllModules(path.join(aulasDir, file)));

console.log("\n🏁 Desbloqueio concluído! Todos os módulos estão acessíveis.\n");
