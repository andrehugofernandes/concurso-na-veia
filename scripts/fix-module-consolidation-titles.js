/**
 * Script para ajustar títulos dos cards de Resumo (ModuleConsolidation)
 *
 * Regra:
 * - Cada ModuleConsolidation dentro de <TabsContent value="modulo-N">
 *   deve ter um título dinâmico: "Resumo do Módulo N"
 * - NÃO altera a indexação (index={N}) que já foi calculada corretamente
 * - Apenas ajusta a propriedade resumoVisual.moduloNome e títulos relacionados
 *
 * ⚠️ SAFETY: Apenas modifica valores de strings dentro de propriedades existentes.
 *    Nunca remove blocos de conteúdo. Usa safeWriteFile para proteção.
 */

const fs = require("fs");
const path = require("path");
const { safeWriteFile, findTsxFiles, isForceMode } = require("./lib/safety");

const aulaDir = path.resolve(__dirname, "../src/components/aulas");
const files = findTsxFiles(aulaDir);
const forceMode = isForceMode();

let totalFilesChanged = 0;
let totalTitleFixes = 0;
let totalBlocked = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("ModuleConsolidation")) continue;

  const originalContent = content;
  let fileTitleFixes = 0;

  // Mapeia módulos por posição
  const tabsRegex = /<TabsContent\s+value="modulo-(\d+)"/g;
  let tabMatch;
  const moduleStarts = [];

  while ((tabMatch = tabsRegex.exec(content)) !== null) {
    moduleStarts.push({
      moduleNum: parseInt(tabMatch[1]),
      startIndex: tabMatch.index,
    });
  }

  for (let i = 0; i < moduleStarts.length; i++) {
    const { moduleNum, startIndex } = moduleStarts[i];
    const endIndex = i < moduleStarts.length - 1
      ? moduleStarts[i + 1].startIndex
      : content.length;

    const section = content.substring(startIndex, endIndex);

    // Encontra ModuleConsolidation dentro dessa seção
    const mcStart = section.indexOf("<ModuleConsolidation");
    if (mcStart === -1) continue;

    const mcEnd = findTagEnd(section, mcStart);
    if (mcEnd === -1) continue;

    const fullTag = section.substring(mcStart, mcEnd);

    // SAFE: apenas troca valores de strings dentro de propriedades já existentes
    let newTag = fullTag;

    // 1a: Ajusta resumoVisual.moduloNome
    newTag = newTag.replace(
      /moduloNome:\s*"[^"]*"/g,
      `moduloNome: "Módulo ${moduleNum}"`
    );

    // 1b: Ajusta maceteVisual.title se existir
    newTag = newTag.replace(
      /title:\s*"Dica de Ouro do Módulo \d+"/g,
      `title: "Dica de Ouro do Módulo ${moduleNum}"`
    );

    if (newTag !== fullTag) {
      const absStart = startIndex + mcStart;
      const absEnd = startIndex + mcEnd;
      content = content.substring(0, absStart) + newTag + content.substring(absEnd);
      fileTitleFixes++;
    }
  }

  if (fileTitleFixes > 0) {
    const relPath = path.relative(aulaDir, filePath);

    if (forceMode) {
      fs.writeFileSync(filePath, content, "utf8");
      totalFilesChanged++;
    } else if (safeWriteFile(filePath, content, originalContent, { relPath })) {
      totalFilesChanged++;
    } else {
      totalBlocked++;
      continue;
    }

    totalTitleFixes += fileTitleFixes;
    console.log(
      `  ✅ ${relPath}: ${fileTitleFixes} ModuleConsolidation(s) atualizado(s)`
    );
  }
}

console.log(
  `\nTotal: ${totalFilesChanged} arquivos, ${totalTitleFixes} ModuleConsolidation atualizados`
);
if (totalBlocked > 0) {
  console.log(`⚠️  ${totalBlocked} arquivo(s) BLOQUEADO(s) por segurança. Use --force para forçar.`);
}

/**
 * Encontra o fim de uma tag JSX self-closing (/>), respeitando chaves { }.
 */
function findTagEnd(content, startIdx) {
  let braceDepth = 0;
  let i = startIdx;
  while (i < content.length && content[i] !== " " && content[i] !== "\n" && content[i] !== "/") i++;

  while (i < content.length - 1) {
    const ch = content[i];
    if (ch === "{") braceDepth++;
    else if (ch === "}") braceDepth--;
    else if (ch === "/" && content[i + 1] === ">" && braceDepth === 0) {
      return i + 2;
    }
    else if (ch === "<" && braceDepth === 0 && i > startIdx + 10) {
      return -1;
    }
    i++;
  }
  return -1;
}
