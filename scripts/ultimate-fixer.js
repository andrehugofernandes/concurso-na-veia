const fs = require("fs");
const path = require("path");
const { safeWriteFile, findTsxFiles, findSelfClosingTagBounds } = require("./lib/safety");

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

    // --- 2. PROCESSAMENTO POR MÓDULO (MOTOR V4 ORCHESTRATOR) ---
    const tabsRegex = /<TabsContent\s+value="modulo-(\d+)"[^>]*>([\s\S]*?)<\/TabsContent>/g;
    let match;
    const blocks = [];

    // Mapeamento de Mnemônicos ULTIMATE
    const mnemonicsMap = {
        1: { k: "NOME", p: "Nomeia, Objetivo, Material, Estado." },
        2: { k: "QUAL", p: "Qualificador, Um atributo, Acorda com o nome, Localizado próximo." },
        3: { k: "SINA", p: "Substantivador, Identificador, Número/Gênero, Anteposto ao nome." },
        4: { k: "SUBRE", p: "SUBstitui ou REfere-se ao nome para coesão." },
        5: { k: "COFM", p: "Cardinal, Ordinal, Fracionário, Multiplicativo." },
        6: { k: "FEA", p: "Fato, Estado ou Ação em uma linha do tempo." },
        7: { k: "CILA", p: "Contexto, Invariável, Local/Modo, Adjetivo/Verbo/Advérbio." },
        8: { k: "LIGA", p: "Ligação, Invariável, Gerador de sentido, Antes do termo." },
        9: { k: "CONE", p: "Conector de Orações, Não varia, Elemento de ligação." },
        10: { k: "EMO", p: "Expressão Modificadora de Oh/Emoção!" }
    };

    while ((match = tabsRegex.exec(content)) !== null) {
        blocks.push({ full: match[0], num: parseInt(match[1]), body: match[2] });
    }

    blocks.forEach(({ full, num, body }) => {
        let newBody = body;
        const v = `mv[${num}]`;

        // Extrair o nome do módulo do ModuleBanner se existir
        const bannerMatch = newBody.match(/<ModuleBanner[^>]*titulo="([^"]+)"/);
        const moduleName = bannerMatch ? bannerMatch[1] : `Módulo ${num}`;

        // A. Banners, Headers e Quizzes (Prop Variant)
        const componentsToSync = ["ModuleBanner", "ModuleSectionHeader", "QuizInterativo", "ModuleConsolidation", "AlertBox"];
        componentsToSync.forEach(comp => {
            const regex = new RegExp(`<${comp}([\\s\\S]*?)\/>`, "g");
            newBody = newBody.replace(regex, (m, props) => {
                let nProps = props.replace(/variant=\{[^}]*\}/g, "").replace(/variant="[^"]*"/g, "").trim();
                if (comp === "ModuleBanner") nProps = nProps.replace(/gradiente="[^"]*"/g, "");
                if (comp === "QuizInterativo") nProps = nProps.replace(/numero=\{\d+\}/g, "");
                return `<${comp} ${nProps.replace(/\s+/g, " ")} variant={${v}} />`;
            });
        });

        // B. ContentAccordion (corIndicador)
        const colorMap = {
            1: "bg-amber-500", 2: "bg-blue-500", 3: "bg-emerald-500", 4: "bg-rose-500", 5: "bg-violet-500",
            6: "bg-amber-600", 7: "bg-blue-600", 8: "bg-emerald-600", 9: "bg-rose-600", 10: "bg-violet-600"
        };
        
        let accordionIdx = 0;
        while (true) {
            const bounds = findSelfClosingTagBounds(newBody, "ContentAccordion", accordionIdx);
            if (!bounds) break;
            const { start, end, tag } = bounds;
            const props = tag.substring(tag.indexOf("ContentAccordion") + 16, tag.length - 2);
            let nProps = props.replace(/corIndicador="[^"]*"/g, "").trim();
            const newTag = `<ContentAccordion ${nProps.replace(/\s+/g, " ")} corIndicador="${colorMap[num]}" />`;
            newBody = newBody.substring(0, start) + newTag + newBody.substring(end);
            accordionIdx = start + newTag.length;
        }

        // C. Standardização de Resumo e Mesa de Revisão (4 ABAS)
        // Procura por ModuleSummaryCarouselNew e sincroniza moduloNome
        newBody = newBody.replace(/<ModuleSummaryCarouselNew([\s\S]*?)\/>/g, (m, props) => {
            let nProps = props.replace(/moduloNome="[^"]*"/g, "").trim();
            return `<ModuleSummaryCarouselNew ${nProps.replace(/\s+/g, " ")} moduloNome="M${num}: ${moduleName}" />`;
        });

        // D. Injeção de Mnemônicos Gramaticais (Macete Visual)
        // O script agora procura por blocos de aba 'macete' e injeta a estrutura padrão
        const mnemonic = mnemonicsMap[num] || { k: "SAAS", p: "Padronização Ultimate." };
        
        // Regex para capturar a aba com id: "macete" e seu conteúdo
        const maceteTabRegex = /\{\s*id:\s*"macete",[\s\S]*?label:\s*"Macete Visual",[\s\S]*?content:\s*\(([\s\S]*?)\),\s*\}/g;
        newBody = newBody.replace(maceteTabRegex, (match, content) => {
            const themeColor = colorMap[num].replace("bg-", "text-");
            const bgColor = `${colorMap[num]}/5`;
            const borderColor = `${colorMap[num]}/20`;

            return `{
                id: "macete",
                label: "Macete Visual",
                icon: LuZap,
                content: (
                  <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-${colorMap[num].replace("bg-", "")}-50/10 rounded-2xl border border-${borderColor.split("/")[0]} shadow-sm space-y-6">
                    <div className="text-6xl font-black ${themeColor} tracking-tighter drop-shadow-sm">
                      ${mnemonic.k}
                    </div>
                    <div className="text-center space-y-2">
                       <h4 className="text-xl font-bold text-foreground">O Mnemônico de Ouro</h4>
                       <p className="text-lg text-muted-foreground whitespace-pre-line">${mnemonic.p}</p>
                    </div>
                  </div>
                ),
              }`;
        });


        // E. Tipografia Editorial
        newBody = newBody.replace(/<p className="([^"]*)">/g, (m, classes) => {
            if (classes.includes("text-muted-foreground") || classes.includes("font-bold") || classes.length < 10) return m;
            let nClasses = classes.replace(/\b(text-base|text-sm|text-xs|text-lg|text-justify)\b/g, "").trim();
            nClasses = `${nClasses} text-lg text-justify text-foreground/85 leading-relaxed`.replace(/\s+/g, " ").trim();
            return `<p className="${nClasses}">`;
        });

        // F. Indexação e Quiz
        let idx = 0;
        newBody = newBody.replace(/index=\{\d+\}/g, 'index={__IDX__}');
        newBody = newBody.replace(/index=\{__IDX__\}/g, () => { idx++; return `index={${idx}}`; });
        newBody = newBody.replace(/<QuizInterativo ([\s\S]*?)variant={${v}} \/>/g, (m, props) => {
            const cleanProps = props.replace(/numero=\{\d+\}/g, "").trim();
            return `<QuizInterativo ${cleanProps} numero={${idx + 1}} variant={${v}} />`;
        });

        if (newBody !== body) {
            const newFull = full.replace(body, newBody);
            content = content.replace(full, newFull);
            modified = true;
        }
    });

    if (modified) {
        const success = safeWriteFile(file, content, originalContent, { relPath: path.basename(file), force: isForce });
        if (success || isForce) {
            console.log(`✅ [SUCESSO] ${path.basename(file)} atingiu padrão ULTIMATE V4.`);
        }
    } else {
        console.log(`✨ [OK] ${path.basename(file)} já estava no padrão V4.`);
    }
});




