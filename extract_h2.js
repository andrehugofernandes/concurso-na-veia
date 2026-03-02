const fs = require('fs');
const lines = fs.readFileSync('src/components/aulas/AulaConcordancia.tsx', 'utf-8').split('\n');
let out = '';
for(let i=0; i<lines.length; i++) {
  if(lines[i].includes('<h2')) {
    out += `\n--- LINE ${i+1} ---\n`;
    for(let j=Math.max(0, i-2); j<=Math.min(lines.length-1, i+7); j++) {
      out += `${j+1}: ${lines[j]}\n`;
    }
  }
}
fs.writeFileSync('h2_blocks.txt', out);
