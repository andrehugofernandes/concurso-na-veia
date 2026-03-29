const fs = require("fs");
const path = require("path");

const aulasDir = path.join(__dirname, "../src/components/aulas/matematica");

function fixMathAula(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;
  const fileName = path.basename(filePath);

  console.log(`\n🔍 Auditando: ${fileName}`);

  // --- A. Garantir Importação e Definição de mv ---
  if (content.includes("mv[")) {
    // 1. Garantir que getAllModuleVariants esteja disponível
    if (!content.includes("getAllModuleVariants")) {
      content = content.replace(
        /import \{([\s\S]*?)\} from "@\/lib\/moduleColors"/,
        (match, imports) => {
          return `import { ${imports.trim().replace(/,$/, "")}, getAllModuleVariants } from "@/lib/moduleColors"`;
        }
      );
      if (!content.includes("@\/lib\/moduleColors")) {
         console.log(`   [Global] Injetando importação de moduleColors...`);
         content = `import { getAllModuleVariants } from "@/lib/moduleColors";\n${content}`;
      }
    }
    // 2. Injetar ou Atualizar const mv antes do componente
    if (content.includes("const mv =")) {
      content = content.replace(
        /const mv = \[null, \.\.\.getAllModuleVariants\(\)\];/,
        `const mv = [undefined, ...getAllModuleVariants()];`
      );
    } else {
      console.log(`   [Global] Injetando definição de mv segura...`);
      content = content.replace(
        /export default function/,
        `const mv = [undefined, ...getAllModuleVariants()];\n\nexport default function`
      );
    }
    modified = true;
  }

  // 1. Lógica de Módulos (Separar por modulo-X)
  const moduleMatches = content.match(/<TabsContent\s+value="modulo-(\d+)"[^>]*>([\s\S]*?)<\/TabsContent>/g);

  if (!moduleMatches) return;

  moduleMatches.forEach((moduleBlock) => {
    const moduleNumber = parseInt(moduleBlock.match(/value="modulo-(\d+)"/)[1]);
    let newModuleBlock = moduleBlock;

    // --- A. Auditoria de Banner ---
    const bannerRegex = /<ModuleBanner\s+numero=\{\d+\}\s+titulo="[^"]*"\s+descricao="[^"]*"\s+([^>]*)\/>/g;
    newModuleBlock = newModuleBlock.replace(bannerRegex, (match, props) => {
      const hasGradient = /gradiente="[^"]*"/.test(props);
      const hasVariant = /variant=\{mv\[\d+\]\}/.test(props);

      if (hasGradient || !hasVariant) {
        console.log(`   [M${moduleNumber}] Sincronizando cores do Banner...`);
        modified = true;
        // Remove gradiente e garante variant
        let newProps = props.replace(/gradiente="[^"]*"/g, "").trim();
        if (!hasVariant) {
          newProps += ` variant={mv[${moduleNumber}]}`;
        }
        return match.replace(props, newProps.replace(/\s+/g, " "));
      }
      return match;
    });

    // --- B. Consolidação de Resumos (Converter Legado) ---
    const legacyResumoRegex = /<section\s+id="(resumo-modulo-\d+|resumo-e-multimidia)"[\s\S]*?<\/section>/g;
    if (legacyResumoRegex.test(newModuleBlock)) {
      console.log(`   [M${moduleNumber}] Removendo resumos legados...`);
      newModuleBlock = newModuleBlock.replace(legacyResumoRegex, "");
      modified = true;
    }

    // --- C. Auditoria de Cores do Header ---
    const headerVariantRegex = /<ModuleSectionHeader([\s\S]*?)variant=\{[^}]*\}[\s\S]*?\/>/g;
    if (headerVariantRegex.test(newModuleBlock)) {
      newModuleBlock = newModuleBlock.replace(headerVariantRegex, (match, content) => {
        const currentVariant = match.match(/variant=\{([^}]*)\}/)[1];
        if (currentVariant !== `mv[${moduleNumber}]`) {
          console.log(`   [M${moduleNumber}] Sincronizando cor do Header...`);
          modified = true;
          return match.replace(/variant=\{[^}]*\}/, `variant={mv[${moduleNumber}]}`);
        }
        return match;
      });
    }

    // --- D. Indexação Numérica Sequencial (Headers -> Consolidation -> Quiz) ---
    let totalInteractiveCards = 0;
    
    // 1. Garantir que o ModuleBanner use o número do módulo correto e remover gradiente se houver
    newModuleBlock = newModuleBlock.replace(/<ModuleBanner\s+numero=\{\d+\}/, `<ModuleBanner numero={${moduleNumber}}`);

    // 2. Normalizar todos os índices de cards numerados
    newModuleBlock = newModuleBlock.replace(/index=\{\d+\}/g, "index={__IDX__}");
    
    // 3. Normalizar apenas o número do QuizInterativo
    newModuleBlock = newModuleBlock.replace(/<QuizInterativo([\s\S]*?)numero=\{\d+\}/, (match, p1) => {
      return `<QuizInterativo${p1}numero={__NUM__}`;
    });

    // Aplicar sequência para todos que usam 'index' (Headers e Consolidation)
    newModuleBlock = newModuleBlock.replace(/index=\{__IDX__\}/g, () => {
      totalInteractiveCards++;
      return `index={${totalInteractiveCards}}`;
    });

    // QuizInterativo recebe o próximo número (totalInteractiveCards + 1)
    if (newModuleBlock.includes("numero={__NUM__}")) {
      const quizIdx = totalInteractiveCards + 1;
      newModuleBlock = newModuleBlock.replace(/numero={__NUM__}/, `numero={${quizIdx}}`);
    }

    // Limpar marcadores temporários se sobraram
    newModuleBlock = newModuleBlock.replace(/index=\{__IDX__\}/g, "index={0}");
    newModuleBlock = newModuleBlock.replace(/numero=\{__NUM__\}/g, "numero={0}");

    if (newModuleBlock !== moduleBlock) {
      content = content.replace(moduleBlock, newModuleBlock);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`   ✅ Alterações aplicadas com sucesso.`);
  } else {
    console.log(`   ✨ Nenhuma intervenção necessária.`);
  }
}

// Execução
const files = fs.readdirSync(aulasDir).filter(f => f.endsWith(".tsx"));
files.forEach(file => fixMathAula(path.join(aulasDir, file)));

console.log("\n🏁 Processo de Padronização ULTIMATE concluído.");
