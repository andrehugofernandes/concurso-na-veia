/**
 * Script para padronizar AulaGeometriaAnalitica
 * Converte de estrutura legacy para padrão:
 *   questoes={quizMN} moduleId="modulo-N" onComplete={...}
 * Para:
 *   questoes={quizMN} numero={N} titulo="QUIZ: [nome-modulo]"
 */

const fs = require("fs");
const path = require("path");

const filePath = path.resolve(
  __dirname,
  "../src/components/aulas/matematica/AulaGeometriaAnalitica.tsx"
);

let content = fs.readFileSync(filePath, "utf8");
const originalContent = content;

// --- PASSO 1: Extrair nomes dos módulos ---
const moduleDefsMatch = content.match(/const MODULE_DEFS = \[([\s\S]*?)\];/);
const moduleNames = {};

if (moduleDefsMatch) {
  const moduleDefsStr = moduleDefsMatch[1];
  const moduleRegex = /\{\s*id:\s*"modulo-(\d+)",\s*label:\s*"[^"]*",\s*(?:title|titulo):\s*"([^"]*)"/g;
  let match;
  while ((match = moduleRegex.exec(moduleDefsStr)) !== null) {
    const moduleNum = parseInt(match[1]);
    const title = match[2];
    moduleNames[moduleNum] = title;
  }
}

console.log("Nomes dos módulos encontrados:", moduleNames);

// --- PASSO 2: Converter QuizInterativo ---
// Busca: <QuizInterativo ... moduleId="modulo-N" ... onComplete={...} />
// Converte para: <QuizInterativo ... numero={N} titulo="QUIZ: ..." />

const quizRegex = /<QuizInterativo\s+([\s\S]*?)(moduleId="modulo-(\d+)"[\s\S]*?)(onComplete=\{[^}]*\})([\s\S]*?)\/>/g;

let replacements = 0;
content = content.replace(quizRegex, (fullMatch, before, moduleIdPart, moduleNum, onComplete, after) => {
  const num = parseInt(moduleNum);
  const moduleName = moduleNames[num] || `Módulo Nº ${num}`;
  const newTitulo = `QUIZ: ${moduleName}`;

  // Remove o moduleId e onComplete, adiciona numero e titulo
  const newQuiz = `<QuizInterativo ${before}numero={${num}} titulo="${newTitulo}"${after}/>`;
  replacements++;
  return newQuiz;
});

if (replacements > 0) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ ${replacements} QuizInterativo(s) convertido(s)`);
  console.log(`📝 Arquivo atualizado: ${path.basename(filePath)}`);
} else {
  console.log("⚠️  Nenhum QuizInterativo encontrado para converter");
}

if (content === originalContent) {
  console.log("❌ Nenhuma mudança foi feita");
} else {
  console.log("✅ Conversão concluída com sucesso!");
}
