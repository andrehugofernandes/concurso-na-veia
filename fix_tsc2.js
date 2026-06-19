const fs = require('fs');

// Fix metrologia-quizzes.ts
const pathMetrologia = 'src/components/aulas/manutencao/data/metrologia-quizzes.ts';
if (fs.existsSync(pathMetrologia)) {
    let metrologiaContent = fs.readFileSync(pathMetrologia, 'utf8');
    metrologiaContent = metrologiaContent.replace(/alternativas:/g, 'opcoes:');
    fs.writeFileSync(pathMetrologia, metrologiaContent, 'utf8');
    console.log('Fixed metrologia-quizzes.ts');
}

// Fix shared.tsx for dicaEstrategica
const pathShared = 'src/components/aulas/shared.tsx';
if (fs.existsSync(pathShared)) {
    let sharedContent = fs.readFileSync(pathShared, 'utf8');
    
    const oldInterface = `export interface QuestaoResolvidaStepByStepProps {
  index?: number;
  titulo?: string;
  variant?: any;
  banca?: string;
  ano?: string;
  concurso?: string;
  enunciado: React.ReactNode | string;
  alternativas: { letra: string; texto: string; correta?: boolean }[];
  dicaEstrategica?: string;
  passos: { titulo: string; conteudo: React.ReactNode | string }[];
}`;

    const newInterface = `export interface QuestaoResolvidaStepByStepProps {
  index?: number;
  titulo?: string;
  variant?: any;
  banca?: string;
  ano?: string;
  concurso?: string;
  enunciado: React.ReactNode | string;
  alternativas: { letra: string; texto: string; correta?: boolean }[];
  dicaEstrategica?: React.ReactNode | string;
  passos: { titulo: string; conteudo: React.ReactNode | string }[];
}`;

    sharedContent = sharedContent.replace(oldInterface, newInterface);
    fs.writeFileSync(pathShared, sharedContent, 'utf8');
    console.log('Fixed shared.tsx dicaEstrategica type');
}
