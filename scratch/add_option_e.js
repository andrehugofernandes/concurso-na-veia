const fs = require('fs');
let content = fs.readFileSync('c:/Workspace/petrobras-quest/src/components/aulas/portugues/data/crase-quizzes.ts', 'utf8');

content = content.replace(/(\{\s*label:\s*"D"[^\}]+\}),?\s*\n\s*\],/g, '$1,\n      { label: "E", valor: "Nenhuma das alternativas anteriores" },\n    ],');

fs.writeFileSync('c:/Workspace/petrobras-quest/src/components/aulas/portugues/data/crase-quizzes.ts', content, 'utf8');
console.log('Replaced occurrences!');
