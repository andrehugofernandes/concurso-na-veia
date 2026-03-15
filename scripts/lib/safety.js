/**
 * ⚠️ MÓDULO DE SEGURANÇA PARA SCRIPTS DE AUTOMAÇÃO
 *
 * REGRA DE OURO: NUNCA perder conteúdo existente.
 * Scripts devem APENAS modificar propriedades pontuais (cores, índices, títulos).
 * Se um script reduzir o arquivo em mais de 2%, ele ABORTA e não salva.
 *
 * Este módulo fornece:
 * - safeWriteFile(): escreve apenas se o conteúdo não encolheu significativamente
 * - findTsxFiles(): busca recursiva de arquivos .tsx
 * - findJsxTagBounds(): encontra os limites de uma tag JSX sem cruzar componentes
 * - contentIntegrityCheck(): valida que componentes-chave não foram removidos
 */

const fs = require("fs");
const path = require("path");

// ── Limiar de segurança ──────────────────────────────────────────────────
// Se o novo conteúdo tiver MENOS linhas que o original por este percentual,
// o script recusa a gravação. Valor: 2% = 0.02
const MAX_SHRINK_RATIO = 0.02;

/**
 * Grava arquivo APENAS se o conteúdo não encolheu além do limiar.
 * Retorna true se gravou, false se bloqueou.
 */
function safeWriteFile(filePath, newContent, originalContent, options = {}) {
  const originalLines = originalContent.split("\n").length;
  const newLines = newContent.split("\n").length;
  const shrink = (originalLines - newLines) / originalLines;
  const relPath = options.relPath || path.basename(filePath);

  // Verificação 1: Redução de tamanho
  if (shrink > MAX_SHRINK_RATIO) {
    console.error(
      `\n  ❌ BLOQUEADO: ${relPath}` +
      `\n     Original: ${originalLines} linhas → Novo: ${newLines} linhas (${(shrink * 100).toFixed(1)}% menor)` +
      `\n     Limiar máximo: ${(MAX_SHRINK_RATIO * 100).toFixed(1)}%` +
      `\n     ⚠️  CONTEÚDO NÃO FOI SALVO para proteger dados existentes.` +
      `\n     Use --force para ignorar esta proteção.\n`
    );
    return false;
  }

  // Verificação 2: Componentes-chave não foram removidos
  const criticalComponents = [
    "ContentAccordion",
    "FlipCard",
    "CardCarousel",
    "ModuleConsolidation",
    "QuizInterativo",
    "ModuleSectionHeader",
    "ModuleBanner",
  ];

  for (const comp of criticalComponents) {
    const originalCount = (originalContent.match(new RegExp(`<${comp}[\\s/>]`, "g")) || []).length;
    const newCount = (newContent.match(new RegExp(`<${comp}[\\s/>]`, "g")) || []).length;

    if (originalCount > 0 && newCount < originalCount) {
      // Permite redução de no máximo 1 instância (pode ser intencional, ex: merge de cards)
      if (originalCount - newCount > 1) {
        console.error(
          `\n  ❌ BLOQUEADO: ${relPath}` +
          `\n     <${comp}> caiu de ${originalCount} → ${newCount} instâncias` +
          `\n     ⚠️  CONTEÚDO NÃO FOI SALVO para proteger dados existentes.\n`
        );
        return false;
      }
    }
  }

  fs.writeFileSync(filePath, newContent, "utf8");
  return true;
}

/**
 * Busca recursiva de arquivos .tsx em um diretório.
 */
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

/**
 * Encontra os limites (start, end) de uma tag JSX self-closing (<Component ... />)
 * a partir de uma posição no conteúdo.
 *
 * Diferente de [\s\S]*?, esta função conta colchetes/chaves para não cruzar
 * limites de componentes vizinhos.
 *
 * @returns {{ start: number, end: number, tag: string }} ou null
 */
function findSelfClosingTagBounds(content, tagName, searchFrom = 0) {
  const openPattern = `<${tagName}`;
  const idx = content.indexOf(openPattern, searchFrom);
  if (idx === -1) return null;

  // Procura o /> que fecha essa tag, contando chaves { } para ignorar expressões JSX
  let braceDepth = 0;
  let i = idx + openPattern.length;

  while (i < content.length - 1) {
    const ch = content[i];
    if (ch === "{") braceDepth++;
    else if (ch === "}") braceDepth--;
    else if (ch === "/" && content[i + 1] === ">" && braceDepth === 0) {
      const end = i + 2;
      return { start: idx, end, tag: content.substring(idx, end) };
    }
    // Segurança: se encontrar outra abertura do mesmo componente, paramos
    if (i > idx + openPattern.length + 5 && content.substring(i, i + openPattern.length) === openPattern && braceDepth === 0) {
      return null; // Não fechou antes de abrir outro
    }
    i++;
  }
  return null;
}

/**
 * Verifica se --force foi passado como argumento.
 */
function isForceMode() {
  return process.argv.includes("--force");
}

module.exports = {
  safeWriteFile,
  findTsxFiles,
  findSelfClosingTagBounds,
  isForceMode,
  MAX_SHRINK_RATIO,
};
