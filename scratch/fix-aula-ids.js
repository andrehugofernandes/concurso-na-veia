const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'aulas', 'administracao', 'AulaAdministracaoTributaria.tsx');

if (!fs.existsSync(filePath)) {
  console.error('File not found:', filePath);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf-8');

// Substitui a propriedade aulaId: "administracaotributaria" por "administracao-tributaria"
const oldPattern = /aulaId:\s*["']administracaotributaria["']/g;
const newPattern = 'aulaId: "administracao-tributaria"';

const count = (content.match(oldPattern) || []).length;
console.log(`Encontradas ${count} ocorrências de aulaId: "administracaotributaria"`);

if (count > 0) {
  content = content.replace(oldPattern, newPattern);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Arquivo atualizado com sucesso!');
} else {
  console.log('Nenhuma ocorrência encontrada para atualizar.');
}
