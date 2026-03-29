/**
 * Script para atualizar ModuleBanner gradientes em UM arquivo específico
 * Uso: node scripts/fix-single-banner.js caminho/do/arquivo.tsx
 */

const fs = require("fs");
const path = require("path");

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

// Pega o arquivo dos argumentos de linha de comando
const targetFile = process.argv[2];

if (!targetFile) {
  console.error("❌ ERRO: Especifique o arquivo alvo");
  console.log("Uso: node scripts/fix-single-banner.js caminho/do/arquivo.tsx");
  process.exit(1);
}

const filePath = path.resolve(__dirname, "../", targetFile);

if (!fs.existsSync(filePath)) {
  console.error(`❌ ERRO: Arquivo não encontrado: ${filePath}`);
  process.exit(1);
}

console.log(`🎯 Processando: ${targetFile}`);

let content = fs.readFileSync(filePath, "utf8");
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
    console.log(`  ✅ Módulo ${moduleNum}: Gradiente atualizado`);
  }
}

if (fileBannerFixes > 0) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`\n🎉 SUCESSO: ${fileBannerFixes} banner(s) atualizado(s) em ${targetFile}`);
} else {
  console.log(`\n✨ Nenhuma alteração necessária em ${targetFile}`);
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
