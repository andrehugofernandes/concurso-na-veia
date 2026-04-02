const fs = require("fs");
const path = require("path");
const { safeWriteFile, findTsxFiles, findSelfClosingTagBounds } = require("./lib/safety");

/**
 * Motor Ultimate - Sincronizador de Aulas
 *
 * ESCOPO CIRÚRGICO: este script APENAS modifica props pontuais de cor/variante.
 * Nunca reescreve ou colapsa o corpo de nenhum componente.
 *
 * Operações permitidas:
 * 1. 🎨 Zero Hardcode: Remove gradientes manuais, usa apenas mv[N]
 * 2. 🧭 Conformidade: Sincroniza variant= de componentes interativos
 * 3. 📦 Import/mv: Injeta import e constante mv se ausentes
 */

const target = process.argv[2];
const isForce = process.argv.includes("--force");
const isDryRun = process.argv.includes("--dry-run");

if (!target) {
    console.error("❌ ERRO: Especifique um arquivo ou diretório.");
    console.log("Ex: node scripts/ultimate-fixer.js src/components/aulas/portugues/AulaClassesPalavras.tsx");
    console.log("    node scripts/ultimate-fixer.js src/components/aulas/portugues/ --dry-run");
    process.exit(1);
}

const resolvePath = (p) => path.join(process.cwd(), p);
const targetPath = resolvePath(target);

if (!fs.existsSync(targetPath)) {
    console.error(`❌ ERRO: Caminho não encontrado: ${targetPath}`);
    process.exit(1);
}

const files = fs.lstatSync(targetPath).isDirectory()
    ? findTsxFiles(targetPath)
    : [targetPath];

console.log(`🚀 Iniciando Ultimate Engine em ${files.length} arquivo(s)...${isDryRun ? " [DRY-RUN]" : ""}`);

/**
 * Substitui APENAS a prop variant= (ou gradiente= no ModuleBanner) dentro de uma
 * tag JSX self-closing, SEM colapsar as quebras de linha do restante das props.
 *
 * Estratégia: localiza a posição exata da prop dentro da tag e faz replace pontual.
 * Nunca recria a tag inteira — preserva toda a formatação original.
 */
function patchVariantInTag(content, tagStart, tagEnd, comp, newVariant, num) {
    const tag = content.substring(tagStart, tagEnd);
    let patchedTag = tag;
    let changed = false;
    const changes = [];

    // Verificar se variant já está correta — se sim, não fazer nada (idempotência)
    const currentVariantMatch = patchedTag.match(/variant=\{([^}]*)\}/);
    const alreadyCorrect = currentVariantMatch && currentVariantMatch[1].trim() === newVariant.trim();
    const hasWrongStringVariant = /variant="[^"]*"/.test(patchedTag);
    const hasGradiente = comp === "ModuleBanner" && /gradiente="[^"]*"/.test(patchedTag);

    if (!alreadyCorrect || hasWrongStringVariant || hasGradiente) {
        // Remover variant= existente (qualquer forma)
        patchedTag = patchedTag
            .replace(/\s*variant=\{[^}]*\}/g, "")
            .replace(/\s*variant="[^"]*"/g, "");

        // Remover gradiente= no ModuleBanner
        if (hasGradiente) {
            patchedTag = patchedTag.replace(/\s*gradiente="[^"]*"/g, "");
            changes.push(`M${num} ${comp}: gradiente removido`);
        }

        // Inserir variant={mv[N]} antes do fechamento />
        patchedTag = patchedTag.replace(/(\s*)\/>$/, `\n          variant={${newVariant}}\n        />`);
        changed = true;
        changes.push(`M${num} ${comp}: variant→${newVariant}`);
    }

    return { patchedTag, changed, changes };
}

/**
 * Substitui corIndicador= em ContentAccordion de forma pontual.
 */
function patchCorIndicadorInTag(content, tagStart, tagEnd, newColor, num) {
    const tag = content.substring(tagStart, tagEnd);
    let patchedTag = tag;
    let changed = false;

    if (/corIndicador="[^"]*"/.test(patchedTag)) {
        const old = patchedTag.match(/corIndicador="([^"]*)"/)[1];
        if (old !== newColor) {
            patchedTag = patchedTag.replace(/corIndicador="[^"]*"/, `corIndicador="${newColor}"`);
            changed = true;
        }
    } else {
        // Não tem corIndicador — inserir antes do />
        patchedTag = patchedTag.replace(/(\s*)\/>$/, `\n          corIndicador="${newColor}"\n        />`);
        changed = true;
    }

    return { patchedTag, changed, changes: changed ? [`M${num} ContentAccordion: corIndicador→${newColor}`] : [] };
}

files.forEach(file => {
    let content = fs.readFileSync(file, "utf8");
    const originalContent = content;
    let modified = false;
    const allChanges = [];

    // --- 1. SETUP GLOBAL: Import e mv ---
    // Suporta dois formatos:
    //   a) getModuleVariant (singular) - aulas padronizadas manualmente
    //   b) getAllModuleVariants (plural)  - formato original do fixer
    // Se "const mv =" já existe, não reescrever.

    const hasMvConst = content.includes("const mv =") || content.includes("const mv=");
    const hasGetModuleVariant = content.includes("getModuleVariant");
    const hasGetAllModuleVariants = content.includes("getAllModuleVariants");

    if (!hasMvConst) {
        if (!hasGetAllModuleVariants && !hasGetModuleVariant) {
            // Nenhum import de moduleColors — injetar getAllModuleVariants
            const importMatch = content.match(/import \{([\s\S]*?)\} from "@\/lib\/moduleColors"/);
            if (importMatch) {
                content = content.replace(
                    /import \{([\s\S]*?)\} from "@\/lib\/moduleColors"/,
                    (match, imports) => {
                        return `import { ${imports.trim().replace(/,$/, "")}, getAllModuleVariants } from "@/lib/moduleColors"`;
                    }
                );
            } else {
                content = `import { getAllModuleVariants } from "@/lib/moduleColors";\n${content}`;
            }
            modified = true;
            allChanges.push("+ import getAllModuleVariants");
        }

        const mvLine = hasGetModuleVariant && !hasGetAllModuleVariants
            ? `const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));`
            : `const mv = [undefined, ...getAllModuleVariants()];`;

        content = content.replace(
            /(export default function|const \w+: React\.FC)/,
            (match) => {
                modified = true;
                allChanges.push("+ const mv");
                return `${mvLine}\n\n${match}`;
            }
        );
    }

    // --- 2. PROCESSAMENTO POR MÓDULO ---
    // Descobrir regiões dos módulos (apenas posição de início, sem capturar body)
    const colorMap = {
        1: "bg-amber-500", 2: "bg-blue-500", 3: "bg-emerald-500", 4: "bg-rose-500", 5: "bg-violet-500",
        6: "bg-amber-600", 7: "bg-blue-600", 8: "bg-emerald-600", 9: "bg-rose-600", 10: "bg-violet-600"
    };

    const tabsStart = [];
    const tabOpenRegex = /<TabsContent\s+value="modulo-(\d+)"/g;
    let tabMatch;
    while ((tabMatch = tabOpenRegex.exec(content)) !== null) {
        tabsStart.push({ num: parseInt(tabMatch[1]), pos: tabMatch.index });
    }

    // Componentes com prop variant a sincronizar
    const componentsToSync = ["ModuleBanner", "ModuleSectionHeader", "QuizInterativo", "ModuleConsolidation", "AlertBox"];

    tabsStart.forEach(({ num, pos }, idx) => {
        const regionEnd = idx + 1 < tabsStart.length ? tabsStart[idx + 1].pos : content.length;
        const v = `mv[${num}]`;

        // A. Sincronizar variant= (troca pontual dentro da tag, sem colapsar props)
        // AlertBox é excluído aqui pois usa sintaxe de abertura/fechamento (<AlertBox>...</AlertBox>)
        // e findSelfClosingTagBounds pode encontrar um /> dentro dos filhos como fechamento falso.
        const componentsViaBounds = componentsToSync.filter(c => c !== "AlertBox");

        componentsViaBounds.forEach(comp => {
            let searchFrom = pos;
            while (searchFrom < regionEnd) {
                const bounds = findSelfClosingTagBounds(content, comp, searchFrom);
                if (!bounds || bounds.start >= regionEnd) break;

                const { start, end } = bounds;
                const { patchedTag, changed, changes } = patchVariantInTag(
                    content, start, end, comp, v, num
                );

                if (changed) {
                    content = content.substring(0, start) + patchedTag + content.substring(end);
                    modified = true;
                    allChanges.push(...changes);

                    const delta = patchedTag.length - (end - start);
                    if (delta !== 0) {
                        for (let j = idx + 1; j < tabsStart.length; j++) {
                            tabsStart[j].pos += delta;
                        }
                    }
                    searchFrom = start + patchedTag.length;
                } else {
                    searchFrom = end;
                }
            }
        });

        // B. ContentAccordion — corIndicador (troca pontual de valor)
        {
            let searchFrom = pos;
            while (searchFrom < regionEnd) {
                const bounds = findSelfClosingTagBounds(content, "ContentAccordion", searchFrom);
                if (!bounds || bounds.start >= regionEnd) break;

                const { start, end } = bounds;
                const { patchedTag, changed, changes } = patchCorIndicadorInTag(
                    content, start, end, colorMap[num], num
                );

                if (changed) {
                    content = content.substring(0, start) + patchedTag + content.substring(end);
                    modified = true;
                    allChanges.push(...changes);

                    const delta = patchedTag.length - (end - start);
                    if (delta !== 0) {
                        for (let j = idx + 1; j < tabsStart.length; j++) {
                            tabsStart[j].pos += delta;
                        }
                    }
                    searchFrom = start + patchedTag.length;
                } else {
                    searchFrom = end;
                }
            }
        }
    });

    if (modified) {
        const origLines = originalContent.split("\n").length;
        const newLines = content.split("\n").length;
        const delta = newLines - origLines;

        if (isDryRun) {
            console.log(`\n  🔍 [DRY-RUN] ${path.basename(file)}`);
            console.log(`     Linhas: ${origLines} → ${newLines} (${delta >= 0 ? "+" : ""}${delta})`);
            allChanges.slice(0, 10).forEach(c => console.log(`     • ${c}`));
            if (allChanges.length > 10) console.log(`     ... e mais ${allChanges.length - 10} mudanças`);
        } else {
            const success = safeWriteFile(file, content, originalContent, { relPath: path.basename(file), force: isForce });
            if (success) {
                console.log(`  ✅ [SUCESSO] ${path.basename(file)} — ${allChanges.length} prop(s) (${delta >= 0 ? "+" : ""}${delta} linhas)`);
                allChanges.slice(0, 5).forEach(c => console.log(`     • ${c}`));
                if (allChanges.length > 5) console.log(`     ... e mais ${allChanges.length - 5}`);
            }
        }
    } else {
        console.log(`  ✨ [OK] ${path.basename(file)} já estava no padrão.`);
    }
});
