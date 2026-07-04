import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '../src/components/aulas');

function findComponentEnd(content, startIndex) {
  let inString = false;
  let stringChar = '';
  let bracketDepth = 0;
  
  for (let i = startIndex + 20; i < content.length; i++) {
    const char = content[i];
    
    if (inString) {
      if (char === stringChar && content[i-1] !== '\\') {
        inString = false;
      }
      continue;
    }
    
    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }
    
    if (char === '{') bracketDepth++;
    if (char === '}') bracketDepth--;
    
    if (bracketDepth === 0 && char === '/' && content[i+1] === '>') {
      return i + 2;
    }
  }
  return -1;
}

function processFile(filePath, materiaDir) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const fileName = path.basename(filePath, '.tsx');
  const aulaNome = fileName.replace('Aula', '').replace(/([A-Z])/g, ' $1').trim(); 
  const materiaId = materiaDir;
  
  const materiaNames = {
    'portugues': 'Português',
    'ti': 'Tecnologia da Informação',
    'matematica': 'Matemática',
    'fisica': 'Física',
    'ingles': 'Inglês',
    'quimica': 'Química',
    'seguranca': 'Segurança do Trabalho',
    'administracao': ' Administração',
    'operacao': 'Operação',
    'manutencao': 'Manutenção',
    'especificas': 'Específicas'
  };
  const materia = materiaNames[materiaDir] || materiaDir;
  const aulaId = fileName.replace('Aula', '').toLowerCase();
  
  let newContent = "";
  let lastIndex = 0;
  
  while (true) {
    const startIndex = content.indexOf('<ModuleConsolidation', lastIndex);
    if (startIndex === -1) {
      newContent += content.substring(lastIndex);
      break;
    }
    
    const endIndex = findComponentEnd(content, startIndex);
    if (endIndex === -1) {
       newContent += content.substring(lastIndex);
       break;
    }
    
    let moduleText = content.substring(startIndex, endIndex);

    // Extract real moduloNumero from moduloNumero={X} first, then moduloNome: "Módulo X", then index
    let moduloNumero = 1;
    const moduloNumMatch = moduleText.match(/moduloNumero=\{([0-9]+)\}/);
    if (moduloNumMatch) {
      moduloNumero = parseInt(moduloNumMatch[1]);
    } else {
      const moduloNomeMatch = moduleText.match(/moduloNome:\s*"Módulo\s*([0-9]+)"/i);
      if (moduloNomeMatch) {
        moduloNumero = parseInt(moduloNomeMatch[1]);
      }
    }
    
    const moduloTitulo = `Módulo ${moduloNumero}`;
    
    // Replace podcast={{...}} if exists or add it
    const podcastIndex = moduleText.indexOf('podcast={{');
    if (podcastIndex !== -1) {
      // replace moduloNumero and moduloTitulo in existing podcast prop
      moduleText = moduleText.replace(/moduloNumero:\s*[0-9]+/, `moduloNumero: ${moduloNumero}`);
      moduleText = moduleText.replace(/moduloTitulo:\s*"[^"]+"/, `moduloTitulo: "${moduloTitulo}"`);
    } else {
      const podcastProp = `podcast={{
            aulaId: "${aulaId}",
            aulaTitulo: "${aulaNome}",
            materia: "${materia}",
            materiaId: "${materiaId}",
            moduloNumero: ${moduloNumero},
            moduloTitulo: "${moduloTitulo}",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}\n          `;
      moduleText = moduleText.substring(0, moduleText.length - 2) + podcastProp + '/>';
    }
    
    newContent += content.substring(lastIndex, startIndex) + moduleText;
    lastIndex = endIndex;
  }
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Fixed podcast moduloNumero in [${materiaDir}] ${fileName}`);
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
console.log("Modulo number fix complete.");
