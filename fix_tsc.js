const fs = require('fs');

// Fix shared.tsx
const pathShared = 'src/components/aulas/shared.tsx';
let sharedContent = fs.readFileSync(pathShared, 'utf8');

// Import LuLightbulb
if (!sharedContent.includes('LuLightbulb,')) {
    sharedContent = sharedContent.replace('LuCheck,', 'LuCheck,\n  LuLightbulb,');
}

// Update Interface for QuestaoResolvidaStepByStepProps
const oldInterface = `export interface QuestaoResolvidaStepByStepProps {
  index?: number;
  titulo?: string;
  variant?: any;
  banca?: string;
  ano?: string;
  concurso?: string;
  enunciado: string;
  alternativas: { letra: string; texto: string; correta: boolean }[];
  dicaEstrategica?: string;
  passos: { titulo: string; conteudo: string }[];
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
  dicaEstrategica?: string;
  passos: { titulo: string; conteudo: React.ReactNode | string }[];
}`;

sharedContent = sharedContent.replace(oldInterface, newInterface);
fs.writeFileSync(pathShared, sharedContent, 'utf8');
console.log('Fixed shared.tsx');

// Fix metrologia-quizzes.ts import
const pathMetrologia = 'src/components/aulas/manutencao/data/metrologia-quizzes.ts';
if (fs.existsSync(pathMetrologia)) {
    let metrologiaContent = fs.readFileSync(pathMetrologia, 'utf8');
    metrologiaContent = metrologiaContent.replace(/from "\.\.\/shared"/g, 'from "../../shared"');
    metrologiaContent = metrologiaContent.replace(/from '\.\.\/shared'/g, "from '../../shared'");
    fs.writeFileSync(pathMetrologia, metrologiaContent, 'utf8');
    console.log('Fixed metrologia-quizzes.ts');
}

