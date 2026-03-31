const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'aulas', 'portugues', 'AulaClassesPalavras.tsx');
let content = fs.readFileSync(filePath, 'utf8');

console.log("🛠️ Iniciando REGEX CLEANUP...");

// 1. Corrigir nomes de ícones (LuPlayCircle -> LuCirclePlay)
content = content.replace(/LuPlayCircle/g, 'LuCirclePlay');

// 2. Remover TODOS os comentários JSX residuais que estão quebrando o parser
content = content.replace(/{\/\*[\s\S]*?\*\/}/g, '');

// 3. Corrigir duplicatas de classes CSS (identificadas pelo Lint)
content = content.replace(/text-foreground\/85 leading-relaxed text-lg text-justify text-foreground\/85 leading-relaxed text-lg text-justify/g, 'text-foreground/85 leading-relaxed text-lg text-justify');
content = content.replace(/font-bold font-bold/g, 'font-bold');

fs.writeFileSync(filePath, content);
console.log("💎 CLEANUP CONCLUÍDO! Tentando renderizar...");
