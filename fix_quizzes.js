const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, 'src/components/aulas/ti/data/mobile-quizzes.ts');
let code = fs.readFileSync(targetFile, 'utf8');

const labels = ['A', 'B', 'C', 'D', 'E'];
let matchCount = 0;

code = code.replace(/opcoes:\s*\[([\s\S]+?)\],\s*correta:\s*(\d+)/g, (match, optionsBlock, corretaIndexStr) => {
  try {
    let arr = eval('[' + optionsBlock + ']');
    if (!Array.isArray(arr) || arr.length === 0) return match;
    
    let newOptions = arr.map((opt, i) => {
      let label = labels[i] || '?';
      return `{ label: "${label}", valor: ${JSON.stringify(opt)} }`;
    });
    
    let originalIdx = parseInt(corretaIndexStr);
    let corretaLabel = labels[originalIdx] || originalIdx.toString();
    
    matchCount++;
    return `opcoes: [\n      ${newOptions.join(',\n      ')}\n    ],\n    correta: "${corretaLabel}"`;
  } catch(e) {
    console.error('Error parsing block:', optionsBlock, e);
    return match;
  }
});

fs.writeFileSync(targetFile, code);
console.log('Successfully replaced ' + matchCount + ' occurrences');
