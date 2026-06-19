const fs = require('fs');

const path = 'src/components/aulas/shared.tsx';
let content = fs.readFileSync(path, 'utf8');

const componentCode = `\n\nexport interface QuestaoResolvidaStepByStepProps {
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
}

export function QuestaoResolvidaStepByStep(props: QuestaoResolvidaStepByStepProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border rounded-xl p-6 shadow-sm mb-8">
      {props.titulo && <h3 className="text-xl font-bold mb-4">{props.titulo}</h3>}
      <div className="mb-4">
        <span className="font-semibold text-primary">{props.banca}</span> • {props.ano} • {props.concurso}
      </div>
      <p className="mb-6 font-medium">{props.enunciado}</p>
      <div className="space-y-3 mb-6">
        {props.alternativas.map((alt) => (
          <div key={alt.letra} className={\`p-4 border rounded-lg flex gap-3 \${alt.correta ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-800/50'}\`}>
            <span className="font-bold">{alt.letra})</span>
            <span>{alt.texto}</span>
            {alt.correta && <LuCheck className="text-green-600 dark:text-green-400 ml-auto" />}
          </div>
        ))}
      </div>
      {props.passos && props.passos.length > 0 && (
        <div className="mt-8 space-y-4">
          <h4 className="font-bold text-lg mb-2">Resolução Passo a Passo</h4>
          {props.passos.map((passo, idx) => (
            <div key={idx} className="border-l-2 border-primary pl-4 py-1">
              <h5 className="font-semibold mb-1">{passo.titulo}</h5>
              <p className="text-muted-foreground">{passo.conteudo}</p>
            </div>
          ))}
        </div>
      )}
      {props.dicaEstrategica && (
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex gap-3">
          <LuLightbulb className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 dark:text-amber-200">
            <span className="font-bold block mb-1">Dica Estratégica:</span>
            {props.dicaEstrategica}
          </p>
        </div>
      )}
    </div>
  );
}
`;

if (!content.includes('export function QuestaoResolvidaStepByStep')) {
  fs.writeFileSync(path, content + componentCode, 'utf8');
  console.log('Added QuestaoResolvidaStepByStep');
} else {
  console.log('Already exists');
}
