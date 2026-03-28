const fs = require("fs");
const path = require("path");

const aulasDir = path.join(__dirname, "../src/components/aulas/matematica");

function unlockAllModules(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  // Estratégia 1: Substitui isModuleUnlocked (se existir)
  const unlockedRegex = /const isModuleUnlocked = \(index: number\) => \{[\s\S]*?\};/;
  if (unlockedRegex.test(content)) {
    const replacement = `const isModuleUnlocked = (index: number) => {
    return true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS PARA VERIFICAÇÃO
  };`;
    content = content.replace(unlockedRegex, replacement);
    modified = true;
  }

  // Estratégia 2: Se há completedModules, pré-popula com todos os módulos
  if (!modified && content.includes("completedModules")) {
    // Encontra o MODULE_DEFS
    const moduleDefMatch = content.match(/const MODULE_DEFS = \[([\s\S]*?)\] as const;/);
    if (moduleDefMatch) {
      const moduleIds = moduleDefMatch[1]
        .match(/id: "([^"]+)"/g)
        .map(m => m.replace('id: "', '').replace('"', ''));

      // Substitui o inicializador de completedModules
      const completedInitRegex = /const \[completedModules, setCompletedModules\] = useState<Set<string>>\(\s*new Set\(\)\s*\);/;

      if (completedInitRegex.test(content)) {
        const ids = moduleIds.map(id => `"${id}"`).join(", ");
        const replacement = `const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set([${ids}]) // ✅ TODOS OS MÓDULOS DESBLOQUEADOS PARA VERIFICAÇÃO
  );`;
        content = content.replace(completedInitRegex, replacement);
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ ${path.basename(filePath)}`);
  } else {
    console.log(`⚠️  ${path.basename(filePath)} - padrão não encontrado`);
  }
}

const files = fs.readdirSync(aulasDir).filter(f => f.endsWith(".tsx"));
console.log(`\n🔓 Desbloqueando ${files.length} aulas de matemática...\n`);

files.forEach(file => {
  try {
    unlockAllModules(path.join(aulasDir, file));
  } catch (err) {
    console.log(`❌ ${path.basename(file)} - erro: ${err.message}`);
  }
});

console.log("\n🏁 Desbloqueio concluído! Todos os módulos estão acessíveis.\n");
