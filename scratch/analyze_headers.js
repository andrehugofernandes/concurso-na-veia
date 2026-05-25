const fs = require('fs');
const content = fs.readFileSync('src/components/aulas/portugues/AulaCrase.tsx', 'utf8');
const matches = [...content.matchAll(/<ModuleSectionHeader[^>]*index=\{?(.*?)\}?\s+title=[\"'](.*?)[\"']/g)];
matches.forEach(m => console.log('Index:', m[1], 'Title:', m[2]));
