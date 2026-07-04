const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/aulas/portugues/AulaClassesPalavras.tsx',
  'src/components/aulas/portugues/AulaConcordancia.tsx',
  'src/components/aulas/portugues/AulaOrtografia.tsx'
];

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, '../', filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix the double music tab comments
    content = content.replace(/\/\* Aba de Música substituída pelo Podcast:\n\/\* Aba de Música substituída pelo Podcast:\n\{/g, '/* Aba de Música substituída pelo Podcast:\n{');
    content = content.replace(/\}\s*,\s*\n\*\/\n\*\//g, '},\n*/');

    // Fix the audio prop comments inside JSX
    // It became /* /* audio={{...}} */ */ or similar if ran twice?
    // Let's just fix the `<ModuleConsolidation ... /* audio={...} */ />` if it was broken
    // But the error in Concordancia was: "Expected '</', got '}'" around quiz.
    // Let's just see what it actually is in Concordancia.
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed comments in ${filePath}`);
  }
});
