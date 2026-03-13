const fs = require('fs');
const path = require('path');

const dir = 'c:/Workspace/petrobras-quest/src/components/aulas/matematica';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Encontrar todas as tags <AlertBox que NÃO tem titulo=
  // regex: /<AlertBox([^>]*?tipo="(warning|danger)"[^>]*?)>/g
  // Mas precisa garantir que n tenha titulo=
  
  let changed = false;
  content = content.replace(/<AlertBox([^>]*?)>/g, (match, attrs) => {
    if (!attrs.includes('titulo=')) {
      changed = true;
      let titulo = "Atenção";
      if (attrs.includes('tipo="danger"')) titulo = "Cuidado";
      return `<AlertBox${attrs} titulo="${titulo}">`;
    }
    return match;
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Corrigido AlertBox em ${file}`);
  }
}
