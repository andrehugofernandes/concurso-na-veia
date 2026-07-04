const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../src/components/aulas');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('.bak')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Safely replace the audio tab by counting braces if possible,
      // or using a very strict regex that doesn't span across `id:`
      
      // We look for `{ id: "audio" ` and stop right after its closing `},`
      // A safe way is to split by `id: "audio"` (or 'audio')
      const parts = content.split(/\{\s*id:\s*["']audio["']/);
      if (parts.length > 1) {
        let newContent = parts[0];
        
        for (let i = 1; i < parts.length; i++) {
          const part = parts[i];
          // We need to find the matching `},` that closes this object.
          // Since it's an object in an array `tabs={[ { id: ... }, { id: ... } ]}`
          // We can just find the next `{ id:` or the end of the array `]}`
          
          // Let's use a simpler Regex now that we know we only have 3 files with LuMusic
          // and we know the structure.
        }
      }

      // Let's just use a precise Regex for the 3 files.
      const strictRegex = /\{\s*id:\s*["']audio["'][^{]*?LuMusic[\s\S]*?<MusicPlayerCard[\s\S]*?\/>\s*\),\s*\},?/g;
      
      if (strictRegex.test(content)) {
        content = content.replace(strictRegex, (match) => {
          // Verify it didn't capture another tab's id
          if (match.split("id:").length > 2) {
            console.error("Matched too much in " + fullPath);
            return match; // don't replace
          }
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

processDirectory(targetDir);
