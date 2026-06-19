const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('-quizzes.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let initialLength = content.length;
            // Add option E after option D
            content = content.replace(/(\{\s*label:\s*"D"[^\}]+\}),?\s*\n\s*\],/g, '$1,\n      { label: "E", valor: "Nenhuma das alternativas anteriores" },\n    ],');
            if (content.length > initialLength) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Processed: ${fullPath}`);
            }
        }
    }
}

processDir('c:/Workspace/petrobras-quest/src/components/aulas');
console.log('All done!');
