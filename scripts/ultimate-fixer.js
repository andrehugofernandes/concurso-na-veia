const fs = require("fs");
const path = require("path");
const { safeWriteFile, findTsxFiles } = require("./lib/safety");

/**
 * Motor Ultimate - Sincronizador de Aulas
 * 
 * Este script é o guardião dos padrões ULTIMATE:
 * 1. 🎨 Zero Hardcode: Remove gradientes manuais, usa apenas mv[N]
 * 2. 📝 Tipografia Editorial: Eleva textos para text-lg text-justify
 * 3. 📊 Indexação Sequencial: Garante ordem correta de h2, acordeons e quizzes
 * 4. 🧭 Conformidade: Sincroniza variantes de componentes interativos
 */

const target = process.argv[2];
const isForce = process.argv.includes("--force");

if (!target) {
    console.error("❌ ERRO: Especifique um arquivo ou diretório.");
    console.log("Ex: node scripts/ultimate-fixer.js src/components/aulas/portugues/AulaClassesPalavras.tsx");
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

console.log(`🚀 Iniciando Ultimate Engine em ${files.length} arquivo(s)...`);

files.forEach(file => {
    let content = fs.readFileSync(file, "utf8");
    const originalContent = content;
    let modified = false;

    // --- 1. SETUP GLOBAL: Import e mv ---
    if (!content.includes("getAllModuleVariants")) {
        const importMatch = content.match(/import \{([\s\S]*?)\} from "@\/lib\/moduleColors"/);
        if (importMatch) {
            content = content.replace(
                /import \{([\s\S]*?)\} from "@\/lib\/moduleColors"/,
                (match, imports) => {
                    modified = true;
                    return `import { ${imports.trim().replace(/,$/, "")}, getAllModuleVariants } from "@/lib/moduleColors"`;
                }
            );
        } else if (content.includes("src/components/aulas")) {
            // Se for arquivo de aula sem import, injetar
            content = `import { getAllModuleVariants } from "@/lib/moduleColors";\n${content}`;
            modified = true;
        }
    }
    
    if (!content.includes("const mv =")) {
        content = content.replace(
            /(export default function|const \w+: React\.FC)/,
            (match) => {
                modified = true;
                return `const mv = [undefined, ...getAllModuleVariants()];\n\n${match}`;
            }
        );
    }

    // --- 2. PROCESSAMENTO POR MÓDULO ---
    const moduleMatches = content.match(/<TabsContent\s+value="modulo-(\d+)"[^>]*>([\s\S]*?)<\/TabsContent>/g);
    
    if (moduleMatches) {
        moduleMatches.forEach(block => {
            const moduleNum = parseInt(block.match(/value="modulo-(\d+)"/)[1]);
            let newBlock = block;
            
            // A. ModuleBanner: Limpeza de gradiente e variant mv[N]
            newBlock = newBlock.replace(/<ModuleBanner([\s\S]*?)\/>/g, (match, props) => {
                let newProps = props.replace(/gradiente="[^"]*"/g, "").trim();
                newProps = newProps.replace(/variant=\{[^}]*\}/g, "").trim();
                newProps = newProps.replace(/variant="[^"]*"/g, "").trim();
                // Limpar espaços duplos
                newProps = newProps.replace(/\s+/g, " ");
                return `<ModuleBanner ${newProps} variant={mv[${moduleNum}]} />`;
            });

            // B. ModuleSectionHeader: Sync variant
            newBlock = newBlock.replace(/<ModuleSectionHeader([\s\S]*?)\/>/g, (match, props) => {
                let newProps = props.replace(/variant=\{[^}]*\}/g, "").trim();
                newProps = newProps.replace(/variant="[^"]*"/g, "").trim();
                newProps = newProps.replace(/\s+/g, " ");
                return `<ModuleSectionHeader ${newProps} variant={mv[${moduleNum}]} />`;
            });

            // C. Tipografia Editorial: text-lg text-justify em div de intro
            // Encontra <div className="... text-base ...">
            newBlock = newBlock.replace(/className="([^"]*)\b(text-base|text-sm|text-xs)\b([^"]*)"/g, (match, before, size, after) => {
                const newClasses = `${before}text-lg text-justify text-foreground/85 leading-relaxed${after}`.replace(/\s+/g, " ").trim();
                return `className="${newClasses}"`;
            });

            // D. Indexação Sequencial Automática
            let currentIdx = 0;
            // Normaliza índices para marcação temporária em headers e componentes que usam index
            newBlock = newBlock.replace(/index=\{\d+\}/g, 'index={__IDX__}');
            // Aplica sequência
            newBlock = newBlock.replace(/index=\{__IDX__\}/g, () => {
                currentIdx++;
                return `index={${currentIdx}}`;
            });

            // E. QuizInterativo: Último índice + 1
            newBlock = newBlock.replace(/<QuizInterativo([\s\S]*?)\/>/g, (match, props) => {
                let newProps = props.replace(/(numero=\{\d+\}|numero=\{[^}]*\})/g, "").trim();
                newProps = newProps.replace(/variant=\{[^}]*\}/g, "").trim();
                newProps = newProps.replace(/\s+/g, " ");
                return `<QuizInterativo ${newProps} numero={${currentIdx + 1}} variant={mv[${moduleNum}]} />`;
            });

            if (newBlock !== block) {
                content = content.replace(block, newBlock);
                modified = true;
            }
        });
    }

    if (modified) {
        const success = safeWriteFile(file, content, originalContent, { relPath: path.basename(file) });
        if (success || isForce) {
            console.log(`✅ [SUCESSO] ${path.basename(file)} padronizado.`);
        }
    } else {
        console.log(`✨ [OK] ${path.basename(file)} já estava no padrão.`);
    }
});
