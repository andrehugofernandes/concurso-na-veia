import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '../src/components/aulas');

function processFile(filePath, materiaDir) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let newContent = content;
  
  // Remove audio={{...}} by balancing brackets
  while (true) {
    const audioIndex = newContent.indexOf('audio={{');
    if (audioIndex === -1) break;
    
    let aDepth = 0;
    let aInString = false;
    let aStringChar = '';
    let audioEnd = -1;
    
    // Start after 'audio='
    for (let j = audioIndex + 6; j < newContent.length; j++) {
      const c = newContent[j];
      if (aInString) {
        if (c === aStringChar && newContent[j-1] !== '\\') aInString = false;
        continue;
      }
      if (c === '"' || c === "'" || c === '`') {
        aInString = true;
        aStringChar = c;
        continue;
      }
      if (c === '{') aDepth++;
      if (c === '}') {
        aDepth--;
        if (aDepth === 0) {
          audioEnd = j + 1;
          break;
        }
      }
    }
    
    if (audioEnd !== -1) {
      newContent = newContent.substring(0, audioIndex) + newContent.substring(audioEnd).replace(/^\s*,?\s*/, '');
    } else {
      break;
    }
  }

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Cleaned audio prop from [${materiaDir}] ${path.basename(filePath)}`);
  }
}

const dirs = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

for (const dir of dirs) {
  const targetDir = path.join(baseDir, dir);
  const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.tsx'));
  for (const file of files) {
    if (file === "shared.tsx") continue;
    processFile(path.join(targetDir, file), dir);
  }
}
console.log("Audio Cleanup complete.");
