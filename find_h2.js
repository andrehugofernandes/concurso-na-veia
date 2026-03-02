const fs = require('fs');
const lines = fs.readFileSync('src/components/aulas/AulaConcordancia.tsx', 'utf-8').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<h2')) {
    console.log(`${i+1}: ${lines[i].trim()} -> ${lines[i+1]?.trim()}`);
  }
}
