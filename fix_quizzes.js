const fs = require('fs');
const path = 'src/components/aulas/portugues/data/crase-quizzes.ts';
let content = fs.readFileSync(path, 'utf8');

const regex = /opcoes:\s*\[\s*\{[^}]+\},\s*\{[^}]+\},\s*\{[^}]+\},\s*\{[^}]+\}\s*\]/g;
let match;
let modifiedCount = 0;

let newContent = content.replace(regex, (match) => {
  if (match.includes('"E"') || match.includes("'E'")) {
    return match; // Already has E
  }
  // Let's add E
  modifiedCount++;
  return match.replace(/(\}\s*)\]$/, '$1, { label: "E", valor: "Nenhuma das alternativas anteriores" } ]');
});

fs.writeFileSync(path, newContent, 'utf8');
console.log('Modified', modifiedCount, 'quizzes');
