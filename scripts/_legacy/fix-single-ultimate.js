/**
 * Script Ultimate para UM arquivo específico de PORTUGUÊS
 * Uso: node scripts/fix-single-ultimate.js caminho/do/arquivo.tsx
 * 
 * FUNCIONALIDADES:
 * 🎨 Gradientes: Sincroniza gradientes dos ModuleBanners
 * 📝 Rich Text: Ajusta intro para text-lg text-justify
 * 📱 Accordions/Flips: Texto padrão text-lg para desktop
 * 📏 Títulos: Aumenta proporcionalmente com bold (text-lg → text-xl font-bold)
 * 📊 Indexação: Numeração sequencial de componentes
 * 🧭 Componentes: AlertBox, ComparisonSide, CardCarousel para text-lg
 */

const fs = require("fs");
const path = require("path");

// Gradientes corretos por módulo (padrão português)
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
  console.log("Uso: node scripts/fix-single-ultimate.js caminho/do/arquivo.tsx");
  process.exit(1);
}

const filePath = path.resolve(__dirname, "../", targetFile);

if (!fs.existsSync(filePath)) {
  console.error(`❌ ERRO: Arquivo não encontrado: ${filePath}`);
  process.exit(1);
}

console.log(`🎯 Processando Ultimate PORTUGUÊS: ${targetFile}`);

let content = fs.readFileSync(filePath, "utf8");
const originalContent = content;
let totalChanges = 0;

// --- B. Processar cada módulo ---
const moduleMatches = content.match(/<TabsContent\s+value="modulo-(\d+)"[^>]*>([\s\S]*?)<\/TabsContent>/g);

if (!moduleMatches) {
  console.log("❌ Nenhum módulo encontrado");
  process.exit(0);
}

moduleMatches.forEach((moduleBlock) => {
  const moduleNumber = parseInt(moduleBlock.match(/value="modulo-(\d+)"/)[1]);
  let newModuleBlock = moduleBlock;
  let moduleChanges = 0;

  // --- B.1. Auditoria de Banner (apenas gradiente) ---
  const bannerRegex = /<ModuleBanner\s+numero=\{\d+\}\s+titulo="[^"]*"\s+descricao="[^"]*"\s+([^>]*)\/>/g;
  newModuleBlock = newModuleBlock.replace(bannerRegex, (match, props) => {
    const hasGradient = /gradiente="[^"]*"/.test(props);
    const correctGradient = gradientMap[moduleNumber];

    if (!hasGradient || !props.includes(correctGradient)) {
      console.log(`   [M${moduleNumber}] Sincronizando gradiente do Banner...`);
      moduleChanges++;
      // Remove gradiente antigo e adiciona o correto
      let newProps = props.replace(/gradiente="[^"]*"/g, "").trim();
      newProps += ` gradiente="${correctGradient}"`;
      return match.replace(props, newProps.replace(/\s+/g, " "));
    }
    return match;
  });

  // --- B.2. Ajustar Rich Text Intro (text-lg text-justify) ---
  // Encontra parágrafos após ModuleSectionHeader que usam text-base/text-sm/text-xs
  const richIntroRegex = /<div className="([^"]*)\b(text-base|text-sm|text-xs)\b([^"]*)"/g;
  newModuleBlock = newModuleBlock.replace(richIntroRegex, (match, beforeClass, currentSize, afterClass) => {
    console.log(`   [M${moduleNumber}] Ajustando rich text para text-lg text-justify...`);
    moduleChanges++;
    return `<div className="${beforeClass.replace(currentSize, 'text-lg text-justify')}${afterClass}"`;
  });

  // --- B.3. Ajustar Accordions e Flips para text-lg ---
  // ContentAccordion - qualquer parágrafo dentro
  const accordionRegex = /<ContentAccordion[^>]*>([\s\S]*?)<p[^>]*class="([^"]*)\b(text-base|text-sm|text-xs)\b([^"]*)"/g;
  newModuleBlock = newModuleBlock.replace(accordionRegex, (match, content, beforeClass, currentSize, afterClass) => {
    console.log(`   [M${moduleNumber}] Ajustando accordion para text-lg...`);
    moduleChanges++;
    return match.replace(`class="${beforeClass}${currentSize}${afterClass}"`, `class="${beforeClass.replace(currentSize, 'text-lg')}${afterClass}"`);
  });

  // FlipCard - qualquer parágrafo dentro
  const flipCardRegex = /<FlipCard[^>]*>([\s\S]*?)<p[^>]*class="([^"]*)\b(text-base|text-sm|text-xs)\b([^"]*)"/g;
  newModuleBlock = newModuleBlock.replace(flipCardRegex, (match, content, beforeClass, currentSize, afterClass) => {
    console.log(`   [M${moduleNumber}] Ajustando flipcard para text-lg...`);
    moduleChanges++;
    return match.replace(`class="${beforeClass}${currentSize}${afterClass}"`, `class="${beforeClass.replace(currentSize, 'text-lg')}${afterClass}"`);
  });

  // --- B.4. Ajustar Títulos Proporcionalmente (bold e maior) ---
  // ModuleSectionHeader - títulos já são h2 dentro dele
  const headerTitleRegex = /class="([^"]*)\btext-lg\b([^"]*)"/g;
  newModuleBlock = newModuleBlock.replace(headerTitleRegex, (match, beforeClass, afterClass) => {
    // Apenas se for título (h2, h3, etc)
    if (newModuleBlock.includes('<h2') || newModuleBlock.includes('<h3') || newModuleBlock.includes('<h4')) {
      console.log(`   [M${moduleNumber}] Aumentando título para text-xl font-bold...`);
      moduleChanges++;
      return `class="${beforeClass.replace('text-lg', 'text-xl font-bold')}${afterClass}"`;
    }
    return match;
  });

  // --- B.4.1. Ajustar todos os elementos para text-lg ---
  // Regex geral para qualquer className com text-base/text-sm/text-xs
  const generalTextRegex = /className="([^"]*)\b(text-base|text-sm|text-xs)\b([^"]*)"/g;
  newModuleBlock = newModuleBlock.replace(generalTextRegex, (match, beforeClass, currentSize, afterClass) => {
    console.log(`   [M${moduleNumber}] Ajustando texto geral para text-lg...`);
    moduleChanges++;
    return `class="${beforeClass.replace(currentSize, 'text-lg')}${afterClass}"`;
  });

  // --- B.5. Indexação Numérica Sequencial ---
  let totalInteractiveCards = 0;
  
  // 1. Garantir que o ModuleBanner use o número do módulo correto
  newModuleBlock = newModuleBlock.replace(/<ModuleBanner\s+numero=\{\d+\}/, `<ModuleBanner numero={${moduleNumber}}`);

  // 2. Normalizar todos os índices de cards numerados
  newModuleBlock = newModuleBlock.replace(/index=\{\d+\}/g, "index={__IDX__}");
  
  // 3. Normalizar apenas o número do QuizInterativo
  newModuleBlock = newModuleBlock.replace(/<QuizInterativo([\s\S]*?)numero=\{\d+\}/, (match, p1) => {
    return `<QuizInterativo${p1}numero={__NUM__}`;
  });

  // Aplicar sequência para todos que usam 'index'
  newModuleBlock = newModuleBlock.replace(/index=\{__IDX__\}/g, () => {
    totalInteractiveCards++;
    return `index={${totalInteractiveCards}}`;
  });

  // QuizInterativo recebe o próximo número
  if (newModuleBlock.includes("numero={__NUM__}")) {
    const quizIdx = totalInteractiveCards + 1;
    newModuleBlock = newModuleBlock.replace(/numero={__NUM__}/, `numero={${quizIdx}}`);
  }

  // Limpar marcadores temporários
  newModuleBlock = newModuleBlock.replace(/index=\{__IDX__\}/g, "index={0}");
  newModuleBlock = newModuleBlock.replace(/numero=\{__NUM__\}/g, "numero={0}");

  if (newModuleBlock !== moduleBlock) {
    content = content.replace(moduleBlock, newModuleBlock);
    totalChanges += moduleChanges;
  }
});

if (totalChanges > 0) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`\n🎉 SUCESSO: ${totalChanges} alterações aplicadas em ${targetFile}`);
} else {
  console.log(`\n✨ Nenhuma alteração necessária em ${targetFile}`);
}
