const fs = require("fs");
const path = require("path");

const aulasDir = path.join(__dirname, "../src/components/aulas/matematica");

function unlockAllModules(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;
  const fileName = path.basename(filePath);

  // Estratégia 1: Substitui isModuleUnlocked com múltiplas variações
  const patterns = [
    /const isModuleUnlocked = \(index: number\) => \{[\s\S]*?\};/,  // Com corpo
    /const isModuleUnlocked = \(_index: number\) => [^;]*;/,        // Com underscore
    /const isModuleUnlocked = \(index: number\) => [^;]*;/,         // Versão curta
  ];

  for (const pattern of patterns) {
    if (pattern.test(content)) {
      const replacement = `const isModuleUnlocked = (_index: number) => true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS`;
      content = content.replace(pattern, replacement);
      modified = true;
      break;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ ${fileName}`);
    return true;
  } else {
    console.log(`⚠️  ${fileName} - padrão não encontrado`);
    return false;
  }
}

const files = fs.readdirSync(aulasDir).filter(f => f.endsWith(".tsx"));
console.log(`\n🔓 Desbloqueando ${files.length} aulas de matemática...\n`);

let successCount = 0;
files.forEach(file => {
  try {
    if (unlockAllModules(path.join(aulasDir, file))) {
      successCount++;
    }
  } catch (err) {
    console.log(`❌ ${file} - erro: ${err.message}`);
  }
});

console.log(`\n🏁 Desbloqueio concluído! ${successCount}/${files.length} aulas desbloqueadas.\n`);
