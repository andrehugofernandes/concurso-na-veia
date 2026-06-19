const fs = require('fs');

const file = 'src/components/aulas/portugues/data/crase-quizzes.ts';
let content = fs.readFileSync(file, 'utf8');

let modified = false;

// We will split the file by "opcoes: ["
const parts = content.split('opcoes: [');
let newContent = parts[0];

for (let i = 1; i < parts.length; i++) {
  let part = parts[i];
  
  // Find the end of the array which is ']'
  const endIdx = part.indexOf(']');
  
  if (endIdx !== -1) {
    const optionsStr = part.substring(0, endIdx);
    const rest = part.substring(endIdx);
    
    // Count labels
    const count = (optionsStr.match(/label:/g) || []).length;
    
    if (count === 4) {
      // Add a 5th option right before the end
      const added = '  { label: "E", valor: "Nenhuma das alternativas anteriores" }\n    ';
      newContent += 'opcoes: [' + optionsStr.replace(/\}\s*$/, '},\n    ' + added) + rest;
      modified = true;
    } else {
      newContent += 'opcoes: [' + part;
    }
  } else {
    newContent += 'opcoes: [' + part;
  }
}

if (modified) {
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Modified the file!');
} else {
  console.log('No 4-option quizzes found.');
}
