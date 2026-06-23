const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/components/home/HomeFooter.tsx',
  'src/components/home/TestimonialsSection.tsx',
  'src/components/home/ResultsSection.tsx',
  'src/components/home/HomeHeader.tsx',
  'src/components/home/FinalCTASection.tsx',
  'src/components/PetrobrasLogo.tsx',
  'src/components/home/DemoSection.tsx',
  'src/components/auth/OtpTutorialContent.tsx',
  'src/components/aulas/shared.tsx',
  'src/app/layout.tsx',
  'src/app/api/stripe/setup/route.ts',
  'src/app/(dashboard)/seja-pro/page.tsx',
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace exact matches
    content = content.replace(/A VAGA EH MINHA/g, 'PASSEI NO CONCURSO');
    content = content.replace(/A Vaga EH Minha/g, 'Passei No Concurso');
    content = content.replace(/A Vaga eh Minha/g, 'Passei No Concurso');
    content = content.replace(/A VAGA/g, 'PASSEI');
    content = content.replace(/A vaga eh sua/g, 'A aprovação é sua');
    content = content.replace(/avagaemia/g, 'passeinoconcurso');
    
    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.warn(`File not found: ${file}`);
  }
});
