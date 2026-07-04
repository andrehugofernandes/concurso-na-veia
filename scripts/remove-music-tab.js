const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../src/components/aulas');

// Atualizadas para serem mais flexíveis
const regexAudioProp = /audio=\{\{[\s\S]*?\}\}/g;
const regexAudioTab = /\{\s*id:\s*["']audio["'],[\s\S]*?icon:\s*LuMusic,[\s\S]*?content:\s*\([\s\S]*?<MusicPlayerCard[\s\S]*?\/>\s*\),\s*\},/g;

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('.bak')) { // Ignore bak files
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      if (regexAudioProp.test(content)) {
        content = content.replace(regexAudioProp, (match) => {
          return `/* ${match} */`;
        });
        modified = true;
      }

      if (regexAudioTab.test(content)) {
        content = content.replace(regexAudioTab, (match) => {
          return `/* Aba de Música substituída pelo Podcast:\n${match}\n*/`;
        });
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Atualizado: ${path.relative(process.cwd(), fullPath)}`);
      }
    }
  });
}

console.log("🚀 Iniciando remoção não-destrutiva das abas de Música...");
processDirectory(targetDir);
console.log("🏁 Concluído!");
