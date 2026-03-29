/**
 * Script para mover cards "Resumo e Multimídia" → dentro de ModuleConsolidation.resumoVisual
 *
 * Estratégia:
 * 1. Para cada módulo, encontra o card "Resumo e Multimídia" com LessonTabs
 * 2. Extrai as imagens de ModuleSummaryCarouselNew
 * 3. Insere no array `images` do `resumoVisual` do ModuleConsolidation
 * 4. Remove o card inteiro
 *
 * ⚠️ SAFETY: Este script REMOVE seções intencionalmente (merge de cards).
 *    Usa safeWriteFile com verificação de componentes críticos.
 *    A remoção é controlada: remove APENAS sections com title="Resumo e Multimídia".
 */

const fs = require("fs");
const path = require("path");
const { safeWriteFile, findTsxFiles, isForceMode } = require("./lib/safety");

const aulaDir = path.resolve(__dirname, "../src/components/aulas");
const files = findTsxFiles(aulaDir);
const forceMode = isForceMode();

let totalFilesChanged = 0;
let totalCardsMoved = 0;
let totalBlocked = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("Resumo e Multimídia")) continue;

  const originalContent = content;
  let fileMoves = 0;

  // --- Encontra todos os blocos "Resumo e Multimídia" usando busca posicional ---
  // Em vez de regex [\s\S]*? que pode cruzar limites, usamos busca de <section> balanceada
  const sectionsToProcess = [];
  let searchFrom = 0;

  while (true) {
    const titleIdx = content.indexOf('title="Resumo e Multimídia"', searchFrom);
    if (titleIdx === -1) break;

    // Encontra a <section> que contém esse título — busca para trás
    const sectionStart = findEnclosingSection(content, titleIdx);
    if (sectionStart === -1) { searchFrom = titleIdx + 1; continue; }

    // Encontra o </section> correspondente — busca para frente com contagem
    const sectionEnd = findMatchingClosingSection(content, sectionStart);
    if (sectionEnd === -1) { searchFrom = titleIdx + 1; continue; }

    const fullSection = content.substring(sectionStart, sectionEnd);

    // Extrai as imagens do ModuleSummaryCarouselNew
    const imagesRegex = /images=\{\s*(\[[\s\S]*?\])\s*\}/;
    const imagesMatch = fullSection.match(imagesRegex);

    if (imagesMatch) {
      sectionsToProcess.push({
        start: sectionStart,
        end: sectionEnd,
        section: fullSection,
        images: imagesMatch[1],
      });
    }

    searchFrom = sectionEnd;
  }

  // Processa de trás pra frente para preservar posições
  for (let j = sectionsToProcess.length - 1; j >= 0; j--) {
    const removal = sectionsToProcess[j];

    // Encontra o ModuleConsolidation ANTERIOR a essa seção
    const beforeSection = content.substring(0, removal.start);
    const lastMcIdx = beforeSection.lastIndexOf("<ModuleConsolidation");

    if (lastMcIdx !== -1) {
      const mcEnd = findTagEnd(content, lastMcIdx);
      if (mcEnd !== -1) {
        const fullConsolidation = content.substring(lastMcIdx, mcEnd);

        if (fullConsolidation.includes("resumoVisual={{")) {
          // Substitui o array images dentro de resumoVisual
          const oldImagesRegex = /(resumoVisual=\{\{[\s\S]*?images:\s*)\[[\s\S]*?\]/;
          const updated = fullConsolidation.replace(
            oldImagesRegex,
            (match, prefix) => `${prefix}${removal.images}`
          );

          if (updated !== fullConsolidation) {
            content = content.substring(0, lastMcIdx) + updated + content.substring(mcEnd);
            fileMoves++;

            // Recalcular posição da seção (pode ter mudado com a substituição acima)
            const newTitleIdx = content.indexOf('title="Resumo e Multimídia"', lastMcIdx);
            if (newTitleIdx !== -1) {
              const newSectionStart = findEnclosingSection(content, newTitleIdx);
              const newSectionEnd = findMatchingClosingSection(content, newSectionStart);
              if (newSectionStart !== -1 && newSectionEnd !== -1) {
                content = content.substring(0, newSectionStart) + content.substring(newSectionEnd);
              }
            }
          }
        }
      }
    }
  }

  if (fileMoves > 0) {
    // Limpa linhas em branco excessivas
    content = content.replace(/\n\n\n+/g, "\n\n");

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

    totalCardsMoved += fileMoves;
    console.log(`  ✅ ${relPath}: ${fileMoves} card(s) "Resumo e Multimídia" movido(s)`);
  }
}

console.log(
  `\nTotal: ${totalFilesChanged} arquivos, ${totalCardsMoved} cards movidos`
);
if (totalBlocked > 0) {
  console.log(`⚠️  ${totalBlocked} arquivo(s) BLOQUEADO(s) por segurança. Use --force para forçar.`);
}

/**
 * Encontra a <section> mais próxima que envolve a posição dada.
 * Busca para trás a partir de `pos`.
 */
function findEnclosingSection(content, pos) {
  let searchFrom = pos;
  while (searchFrom > 0) {
    const idx = content.lastIndexOf("<section", searchFrom);
    if (idx === -1) return -1;

    // Verifica se esta section realmente envolve `pos`
    // (seu </section> deve estar depois de `pos`)
    const closingEnd = findMatchingClosingSection(content, idx);
    if (closingEnd !== -1 && closingEnd > pos) {
      return idx;
    }

    searchFrom = idx - 1;
  }
  return -1;
}

/**
 * Encontra o </section> correspondente, contando tags aninhadas.
 * Retorna a posição APÓS </section>.
 */
function findMatchingClosingSection(content, sectionStart) {
  let depth = 0;
  let i = sectionStart;

  while (i < content.length) {
    if (content.substring(i, i + 8) === "<section") {
      depth++;
      i += 8;
    } else if (content.substring(i, i + 10) === "</section>") {
      depth--;
      if (depth === 0) return i + 10;
      i += 10;
    } else {
      i++;
    }
  }

  return -1;
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
