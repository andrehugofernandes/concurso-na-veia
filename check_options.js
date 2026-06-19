const fs = require('fs');
const path = 'src/components/aulas/portugues/data/crase-quizzes.ts';
let content = fs.readFileSync(path, 'utf8');

// Find all arrays of opcoes and count their items
const regex = /opcoes:\s*\[([\s\S]*?)\]/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const optionsStr = match[1];
  const optionCount = (optionsStr.match(/label:/g) || []).length;
  if (optionCount !== 5) {
    console.log('Found quiz with ' + optionCount + ' options near index ' + match.index);
  }
}
