const fs = require('fs');
let content = fs.readFileSync('src/components/aulas/AulaReescritaFrases.tsx', 'utf-8');

// Replace ModuleBanner gradients
content = content.replace(
  'gradiente="bg-gradient-to-br from-blue-600 to-indigo-700"',
  'gradiente="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"'
);
content = content.replace(
  'gradiente="bg-gradient-to-br from-purple-600 to-indigo-700"',
  'gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"'
);
content = content.replace(
  'gradiente="bg-gradient-to-br from-red-600 to-orange-700"',
  'gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"'
);

// H2 replacement
const regexH2 = /<h2 className="[^"]+">(?:\s*)<span className="[^"]+">(?:\s*)([^<]+)(?:\s*)<\/span>(?:\s*)([^<]+)(?:\s*)<\/h2>/g;

content = content.replace(regexH2, (match, index, title, offset) => {
  let variant = 'indigo';
  const linesBefore = content.substring(0, offset).split('\n').length;
  
  if (linesBefore > 710 && linesBefore < 1030) variant = 'emerald';
  if (linesBefore >= 1030) variant = 'violet';
  
  let formattedIndex = index.trim();
  let indexProp = isNaN(Number(formattedIndex)) ? `"${formattedIndex}"` : `{${formattedIndex}}`;
  
  return `<ModuleSectionHeader
              index=${indexProp}
              title="${title.trim()}"
              variant="${variant}"
              className="mb-8"
            />`;
});

// QuizInterativo Replacement
const quizRegex = /<QuizInterativo([\s\S]*?)onComplete=\{\(score\)/g;
content = content.replace(quizRegex, (match, group1, offset) => {
  let variant = 'indigo';
  const linesBefore = content.substring(0, offset).split('\n').length;
  
  if (linesBefore > 710 && linesBefore < 1030) variant = 'emerald';
  if (linesBefore >= 1030) variant = 'violet';
  
  if (!match.includes('variant=')) {
    return `<QuizInterativo${group1}variant="${variant}"\n            onComplete={(score)`;
  }
  return match;
});

// Fix imports to add ModuleSectionHeader
if(!content.includes('ModuleSectionHeader,')){
  content = content.replace('AulaTemplate,', 'AulaTemplate,\n  ModuleSectionHeader,');
}

fs.writeFileSync('src/components/aulas/AulaReescritaFrases.tsx', content);
console.log('Update Complete');
