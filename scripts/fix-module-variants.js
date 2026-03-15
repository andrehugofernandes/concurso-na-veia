/**
 * Script para:
 * 1. Substituir todos os getModuleVariant(N) hardcoded por mv[N]
 * 2. Garantir que a declaração de mv está no escopo correto (componente principal)
 * 3. Indexar corretamente os cards numerados (ModuleSectionHeader index) por módulo
 *
 * Dentro de cada <TabsContent value="modulo-N">:
 *   - getModuleVariant(qualquer) → mv[N]
 *   - ModuleSectionHeader index resets para 1,2,3... dentro de cada módulo
 *
 * ⚠️ SAFETY: Usa safeWriteFile para proteger contra perda de conteúdo.
 *    Apenas modifica PROPRIEDADES pontuais (variant=, index=), nunca remove blocos.
 */

const fs = require("fs");
const path = require("path");
const { safeWriteFile, findTsxFiles, findSelfClosingTagBounds, isForceMode } = require("./lib/safety");

const aulaDir = path.resolve(__dirname, "../src/components/aulas");
const files = findTsxFiles(aulaDir);
const forceMode = isForceMode();

let totalFilesChanged = 0;
let totalReplacements = 0;
let totalIndexFixes = 0;
let totalBlocked = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, "utf8");

  // Pula se não usa getModuleVariant e nem mv[
  if (!content.includes("getModuleVariant(") && !content.includes("mv[")) continue;

  const originalContent = content;
  let fileReplacements = 0;
  let fileIndexFixes = 0;

  // --- PASSO 0: Limpar declarações mv anteriores (bloco específico, não [\s\S]*?) ---
  // Remove APENAS as 4 linhas exatas do bloco mv (comentário + const + array + cast)
  const mvBlockLines = [];
  const lines = content.split("\n");
  let inMvBlock = false;
  let mvBlockStart = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("// Variantes de cor pré-computadas")) {
      inMvBlock = true;
      mvBlockStart = i;
    }
    if (inMvBlock) {
      mvBlockLines.push(i);
      if (lines[i].includes("as Record<number, ReturnType<typeof getModuleVariant>>")) {
        inMvBlock = false;
      }
      // Safety: max 6 linhas para o bloco mv
      if (mvBlockLines.length > 6) {
        inMvBlock = false;
        mvBlockLines.length = 0; // Descarta — algo está errado
        break;
      }
    }
  }

  if (mvBlockLines.length > 0) {
    // Remove as linhas do bloco mv (de trás pra frente para preservar índices)
    for (let i = mvBlockLines.length - 1; i >= 0; i--) {
      lines.splice(mvBlockLines[i], 1);
    }
    content = lines.join("\n");
    // Limpa linhas em branco consecutivas que ficaram
    content = content.replace(/\n{3,}/g, "\n\n");
  }

  // --- PASSO 0b: Reverter qualquer mv[N] anterior para getModuleVariant(N) ---
  content = content.replace(/\bmv\[(\d+)\]/g, "getModuleVariant($1)");

  // --- PASSO 1: Mapear as seções TabsContent ---
  const tabsContentRegex = /<TabsContent\s+value="modulo-(\d+)"/g;
  let match;
  const moduleStarts = [];

  while ((match = tabsContentRegex.exec(content)) !== null) {
    moduleStarts.push({
      moduleNum: parseInt(match[1]),
      startIndex: match.index,
    });
  }

  if (moduleStarts.length === 0) continue;

  // --- PASSO 2: Dentro de cada módulo, substituir getModuleVariant(N) e re-indexar cards ---
  // Processa de trás pra frente para preservar posições
  for (let i = moduleStarts.length - 1; i >= 0; i--) {
    const { moduleNum, startIndex } = moduleStarts[i];
    const endIndex =
      i < moduleStarts.length - 1
        ? moduleStarts[i + 1].startIndex
        : content.length;

    let section = content.substring(startIndex, endIndex);

    // 2a: Substituir getModuleVariant(qualquer) → mv[moduleNum]
    // SAFE: substitui apenas a chamada da função, não remove nada
    section = section.replace(
      /getModuleVariant\(\d+\)/g,
      () => {
        fileReplacements++;
        return `mv[${moduleNum}]`;
      }
    );

    // 2b: Re-indexar ModuleSectionHeader index sequencialmente (1, 2, 3...)
    // SAFE: usa findSelfClosingTagBounds para encontrar cada tag individualmente
    let sectionIndex = 0;
    let searchPos = 0;

    // Encontra cada ModuleSectionHeader e ajusta apenas o index={}
    while (true) {
      const mshIdx = section.indexOf("<ModuleSectionHeader", searchPos);
      if (mshIdx === -1) break;

      // Encontra o fim dessa tag (/>)
      const tagEnd = findTagEnd(section, mshIdx);
      if (tagEnd === -1) { searchPos = mshIdx + 1; continue; }

      const tagStr = section.substring(mshIdx, tagEnd);
      sectionIndex++;

      // Substitui APENAS index={N} dentro dessa tag
      const newTag = tagStr.replace(/\bindex=\{(\d+)\}/, () => {
        fileIndexFixes++;
        return `index={${sectionIndex}}`;
      });

      if (newTag !== tagStr) {
        section = section.substring(0, mshIdx) + newTag + section.substring(tagEnd);
      }

      searchPos = mshIdx + newTag.length;
    }

    // 2c: Re-indexar ModuleConsolidation index sequencialmente (continua a contagem)
    searchPos = 0;
    while (true) {
      const mcIdx = section.indexOf("<ModuleConsolidation", searchPos);
      if (mcIdx === -1) break;

      const tagEnd = findTagEnd(section, mcIdx);
      if (tagEnd === -1) { searchPos = mcIdx + 1; continue; }

      const tagStr = section.substring(mcIdx, tagEnd);
      sectionIndex++;

      const newTag = tagStr.replace(/\bindex=\{(\d+)\}/, () => {
        fileIndexFixes++;
        return `index={${sectionIndex}}`;
      });

      if (newTag !== tagStr) {
        section = section.substring(0, mcIdx) + newTag + section.substring(tagEnd);
      }

      searchPos = mcIdx + newTag.length;
    }

    content =
      content.substring(0, startIndex) + section + content.substring(endIndex);
  }

  // --- PASSO 3: Inserir declaração mv no lugar certo (apenas se não existe) ---
  if (fileReplacements > 0 && !content.includes("const mv = Object.fromEntries")) {
    const firstTabsIndex = content.indexOf("<TabsContent");
    if (firstTabsIndex !== -1) {
      const beforeTabs = content.substring(0, firstTabsIndex);
      const returnMatches = [...beforeTabs.matchAll(/\n(\s*)return\s*\(/g)];

      if (returnMatches.length > 0) {
        const lastReturn = returnMatches[returnMatches.length - 1];
        const indent = lastReturn[1];
        const insertPos = lastReturn.index;

        const mvBlock =
          `\n${indent}// Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)\n` +
          `${indent}const mv = Object.fromEntries(\n` +
          `${indent}  Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])\n` +
          `${indent}) as Record<number, ReturnType<typeof getModuleVariant>>;\n`;

        content =
          content.substring(0, insertPos) +
          mvBlock +
          content.substring(insertPos);
      }
    }
  }

  if (content !== originalContent) {
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

    totalReplacements += fileReplacements;
    totalIndexFixes += fileIndexFixes;
    console.log(`  ✅ ${relPath}: ${fileReplacements} variant, ${fileIndexFixes} index`);
  }
}

console.log(
  `\nTotal: ${totalFilesChanged} arquivos, ${totalReplacements} variants, ${totalIndexFixes} indexes`
);
if (totalBlocked > 0) {
  console.log(`⚠️  ${totalBlocked} arquivo(s) BLOQUEADO(s) por segurança. Use --force para forçar.`);
}

/**
 * Encontra o fim de uma tag JSX self-closing (/>), respeitando chaves { }.
 * Retorna a posição APÓS o />, ou -1 se não encontrou.
 */
function findTagEnd(content, startIdx) {
  let braceDepth = 0;
  let i = startIdx;
  // Pula o nome da tag
  while (i < content.length && content[i] !== " " && content[i] !== "\n" && content[i] !== "/") i++;

  while (i < content.length - 1) {
    const ch = content[i];
    if (ch === "{") braceDepth++;
    else if (ch === "}") braceDepth--;
    else if (ch === "/" && content[i + 1] === ">" && braceDepth === 0) {
      return i + 2;
    }
    // Safety: se encontrar abertura de outra tag sem ter fechado, aborta
    else if (ch === "<" && braceDepth === 0 && i > startIdx + 10) {
      return -1;
    }
    i++;
  }
  return -1;
}
