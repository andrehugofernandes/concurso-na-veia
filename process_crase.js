const fs = require('fs');
let content = fs.readFileSync('src/components/aulas/AulaCrase.tsx', 'utf-8');

// Replace ModuleBanner gradients
content = content.replace(
  'gradiente="bg-gradient-to-br from-pink-600 via-rose-600 to-red-700"',
  'gradiente="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"'
);
content = content.replace(
  'gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600"',
  'gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"'
);
content = content.replace(
  'gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"',
  'gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"' // Already correct, but keep just in case
);

// Add variant="indigo" to Module 1 elements (lines ~560 to ~820)
// Add variant="emerald" to Module 2 elements (lines ~820 to ~1080)
// Add variant="violet" to Module 3 elements (lines ~1080 to end)

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  let variant = '';
  if (i > 560 && i < 815) variant = 'indigo';
  else if (i >= 815 && i < 1085) variant = 'emerald';
  else if (i >= 1085 && i < 1400) variant = 'violet';

  if (variant !== '') {
    if (lines[i].includes('<ModuleSectionHeader') && !lines[i+1].includes('variant=')) {
      lines[i] = lines[i] + `\n              variant="${variant}"`;
    }
    if (lines[i].includes('<QuizInterativo') && !lines[i].includes('variant=')) {
      // It might be multi-line
      // Just find the next > and insert before it
    }
  }
}

// Better way to do QuizInterativo:
let newContent = lines.join('\n');
newContent = newContent.replace(/<QuizInterativo([\s\S]*?)onComplete=\{\(score\)/g, (match, group1, offset) => {
  let variant = 'indigo';
  if (offset > 45000) variant = 'violet'; // roughly length
  else if (offset > 25000) variant = 'emerald';
  
  // Real check by counting newlines before offset
  const linesBefore = newContent.substring(0, offset).split('\n').length;
  if (linesBefore > 560 && linesBefore < 815) variant = 'indigo';
  else if (linesBefore >= 815 && linesBefore < 1085) variant = 'emerald';
  else if (linesBefore >= 1085) variant = 'violet';

  if (!match.includes('variant=')) {
    return `<QuizInterativo${group1}variant="${variant}"\n            onComplete={(score)`;
  }
  return match;
});

// Also replace the h2 at 1244
newContent = newContent.replace(
  /<h2 className="text-2xl font-bold mb-6 text-center">([\s\S]*?)<\/h2>/,
  '<ModuleSectionHeader\n              index="🧠"\n              title="Resumo Final: Crase com Pronomes Demonstrativos"\n              variant="violet"\n              className="mb-8"\n            />'
);

fs.writeFileSync('src/components/aulas/AulaCrase.tsx', newContent);
console.log('Done!');
