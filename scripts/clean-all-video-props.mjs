import fs from 'fs';
import path from 'path';

function removeVideoProps(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeVideoProps(fullPath);
    } else if (file.endsWith('.tsx') && file !== 'shared.tsx') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let updated = false;

      while (true) {
        const vIndex = content.indexOf('video={{');
        if (vIndex === -1) break;

        let depth = 0;
        let end = -1;
        for (let i = vIndex + 6; i < content.length; i++) {
          if (content[i] === '{') depth++;
          if (content[i] === '}') {
            depth--;
            if (depth === 0) {
              end = i + 1;
              break;
            }
          }
        }
        if (end !== -1) {
          content = content.substring(0, vIndex) + content.substring(end).replace(/^\s*,?\s*/, '');
          updated = true;
        } else {
          break;
        }
      }

      if (updated) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Cleaned video from ${file}`);
      }
    }
  }
}

removeVideoProps(path.join(process.cwd(), 'src/components/aulas'));
console.log("Global video prop cleanup finished.");
