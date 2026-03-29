/**
 * Script para ajustar indexação e títulos dos QuizInterativo
 *
 * Regras:
 * 1. Index do quiz = última indexação sequencial do módulo (após contar ModuleSectionHeader + ModuleConsolidation)
 * 2. Título do quiz = "QUIZ: [nome-do-modulo]"
 *    Fallback se muito complexo: "QUIZ: Módulo Nº [numero-do-modulo]"
 *
 * Extrai os nomes dos módulos de MODULE_DEFS
 */

const fs = require("fs");
const path = require("path");

function findTsxFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findTsxFiles(fullPath));
    } else if (entry.name.endsWith(".tsx")) {
      results.push(fullPath);
    }
  }
  return results;
}

const aulaDir = path.resolve(__dirname, "../src/components/aulas");
const files = findTsxFiles(aulaDir);

let totalFilesChanged = 0;
let totalQuizFixes = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("QuizInterativo")) continue;

  const originalContent = content;
  let fileQuizFixes = 0;

  // --- PASSO 1: Extrair nomes dos módulos de MODULE_DEFS ---
  const moduleDefsMatch = content.match(/const MODULE_DEFS = \[([\s\S]*?)\];/);
  const moduleNames = {};

  if (moduleDefsMatch) {
    const moduleDefsStr = moduleDefsMatch[1];
    // Busca por "title:" ou "titulo:" (alguns arquivos usam português)
    const moduleRegex = /\{\s*id:\s*"modulo-(\d+)",\s*label:\s*"[^"]*",\s*(?:title|titulo):\s*"([^"]*)"/g;
    let match;
    while ((match = moduleRegex.exec(moduleDefsStr)) !== null) {
      const moduleNum = parseInt(match[1]);
      const title = match[2];
      moduleNames[moduleNum] = title;
    }
  }

  // --- PASSO 2: Para cada módulo, contar cards e ajustar quiz ---
  const tabsRegex = /<TabsContent\s+value="modulo-(\d+)"[\s\S]*?(?=<TabsContent|$)/g;
  let tabMatch;

  while ((tabMatch = tabsRegex.exec(content)) !== null) {
    const moduleNum = parseInt(tabMatch[1]);
    const tabsSection = tabMatch[0];

    // Conta ModuleSectionHeader e ModuleConsolidation index (pega o último número)
    const indexMatches = [...tabsSection.matchAll(/(?:ModuleSectionHeader|ModuleConsolidation)[^{]*index=\{(\d+)\}/g)];
    let maxIndex = 0;
    for (const match of indexMatches) {
      const idx = parseInt(match[1]);
      if (idx > maxIndex) maxIndex = idx;
    }

    const quizIndex = maxIndex + 1; // Quiz é o próximo após o último card

    // Encontra QuizInterativo dentro dessa seção
    const quizRegex = /<QuizInterativo\s[\s\S]*?\/>/;
    const quizMatch = tabsSection.match(quizRegex);

    if (quizMatch) {
      const oldQuiz = quizMatch[0];
      let newQuiz = oldQuiz;

      // 2a: Ajusta numero={N}
      newQuiz = newQuiz.replace(
        /numero=\{\d+\}/,
        `numero={${quizIndex}}`
      );

      // 2b: Ajusta titulo
      const moduleName = moduleNames[moduleNum] || `Módulo Nº ${moduleNum}`;
      const newTitulo = `QUIZ: ${moduleName}`;
      newQuiz = newQuiz.replace(
        /titulo="[^"]*"/,
        `titulo="${newTitulo}"`
      );

      // Substitui no content
      if (newQuiz !== oldQuiz) {
        content = content.replace(oldQuiz, newQuiz);
        fileQuizFixes++;
      }
    }
  }

  if (fileQuizFixes > 0) {
    fs.writeFileSync(filePath, content, "utf8");
    totalFilesChanged++;
    totalQuizFixes += fileQuizFixes;
    const relPath = path.relative(aulaDir, filePath);
    console.log(`  ${relPath}: ${fileQuizFixes} quiz(zes) ajustado(s)`);
  }
}

console.log(`\nTotal: ${totalFilesChanged} arquivos, ${totalQuizFixes} quizzes ajustados`);
