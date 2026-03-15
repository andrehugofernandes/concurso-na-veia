/**
 * Script para atualizar ModuleBanner gradientes
 * Ajusta os gradientes para usar as novas cores (1-5 claras -300, 6-10 escuras -900)
 *
 * Padrão novo:
 * - Módulos 1-5: gradientes com -300 e -500
 * - Módulos 6-10: gradientes com -900 e -700
 *
 * ⚠️ SAFETY: Apenas modifica o atributo gradiente="" dentro de <ModuleBanner />.
 *    Nunca remove blocos de conteúdo. Usa safeWriteFile para proteção.
 */

const fs = require("fs");
const path = require("path");
const { safeWriteFile, findTsxFiles, isForceMode } = require("./lib/safety");

// Gradientes corretos por módulo
const gradientMap = {
  1:  "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400",
  2:  "bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400",
  3:  "bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400",
  4:  "bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400",
  5:  "bg-gradient-to-br from-violet-300 via-violet-500 to-violet-400",
  6:  "bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800",
  7:  "bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800",
  8:  "bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800",
  9:  "bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800",
  10: "bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800",
};

const aulaDir = path.resolve(__dirname, "../src/components/aulas");
const files = findTsxFiles(aulaDir);
const forceMode = isForceMode();

let totalFilesChanged = 0;
let totalBannersFixes = 0;
let totalBlocked = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("ModuleBanner")) continue;

  const originalContent = content;
  let fileBannerFixes = 0;

  // Mapeia módulos por posição
  const tabsRegex = /<TabsContent\s+value="modulo-(\d+)"/g;
  let match;
  const moduleStarts = [];

  while ((match = tabsRegex.exec(content)) !== null) {
    moduleStarts.push({
      moduleNum: parseInt(match[1]),
      startIndex: match.index,
    });
  }

  // Para cada módulo, encontra o ModuleBanner e ajusta o gradiente
  for (let i = 0; i < moduleStarts.length; i++) {
    const { moduleNum, startIndex } = moduleStarts[i];
    const endIndex = i < moduleStarts.length - 1
      ? moduleStarts[i + 1].startIndex
      : content.length;

    const section = content.substring(startIndex, endIndex);
    const bannerStart = section.indexOf("<ModuleBanner");
    if (bannerStart === -1) continue;

    const bannerEnd = findTagEnd(section, bannerStart);
    if (bannerEnd === -1) continue;

    const bannerTag = section.substring(bannerStart, bannerEnd);
    const newGradient = gradientMap[moduleNum];
    if (!newGradient) continue;

    // SAFE: apenas troca o valor entre aspas de gradiente=""
    const newBannerTag = bannerTag.replace(
      /gradiente="[^"]*"/,
      `gradiente="${newGradient}"`
    );

    if (newBannerTag !== bannerTag) {
      const absStart = startIndex + bannerStart;
      const absEnd = startIndex + bannerEnd;
      content = content.substring(0, absStart) + newBannerTag + content.substring(absEnd);
      fileBannerFixes++;
    }
  }

  if (fileBannerFixes > 0) {
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

    totalBannersFixes += fileBannerFixes;
    console.log(`  ✅ ${relPath}: ${fileBannerFixes} banner(s) atualizado(s)`);
  }
}

console.log(
  `\nTotal: ${totalFilesChanged} arquivos, ${totalBannersFixes} banners atualizados`
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
