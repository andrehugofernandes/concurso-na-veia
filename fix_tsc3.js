const fs = require('fs');

const pathMetrologia = 'src/components/aulas/manutencao/data/metrologia-quizzes.ts';
if (fs.existsSync(pathMetrologia)) {
    let metrologiaContent = fs.readFileSync(pathMetrologia, 'utf8');
    // The error says "id does not exist in type { label: string; valor: ReactNode; }"
    // So we need to remove `id: '...',` or `id: "...",` inside the opcoes array.
    metrologiaContent = metrologiaContent.replace(/id:\s*['"][A-E]['"],\s*/g, '');
    fs.writeFileSync(pathMetrologia, metrologiaContent, 'utf8');
    console.log('Fixed metrologia-quizzes.ts options id');
}
