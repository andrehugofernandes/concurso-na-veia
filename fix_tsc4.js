const fs = require('fs');

const pathMetrologia = 'src/components/aulas/manutencao/data/metrologia-quizzes.ts';
if (fs.existsSync(pathMetrologia)) {
    let content = fs.readFileSync(pathMetrologia, 'utf8');
    
    // We need to transform the questions. The best way is to parse it, but it's JS with TS.
    // Let's just use regex to replace it.
    
    // Replace `{ id: "a", texto: "O centímetro...", correta: false }` 
    // with `{ label: "A", valor: "O centímetro..." }`
    
    content = content.replace(/\{[ \t]*id:[ \t]*['"]([a-e])['"],[ \t]*texto:[ \t]*(['"].*?['"])[ \t]*,[ \t]*correta:[ \t]*(true|false)[ \t]*\}/gi, (match, id, texto, correta) => {
        return `{ label: "${id.toUpperCase()}", valor: ${texto} } /* correta: ${correta} */`;
    });
    
    // Now we need to add `correta: "..."` to the question object. We'll add it before `explicacao` based on the comment.
    // Wait, regex might be too complex for that.
    
    content = content.replace(/opcoes: \[\s*\{ label: "A", valor: (.*?) \} \/\* correta: (true|false) \*\/,\s*\{ label: "B", valor: (.*?) \} \/\* correta: (true|false) \*\/,\s*\{ label: "C", valor: (.*?) \} \/\* correta: (true|false) \*\/,\s*\{ label: "D", valor: (.*?) \} \/\* correta: (true|false) \*\/,\s*\],\s*explicacao:/g, (match, vA, cA, vB, cB, vC, cC, vD, cD) => {
        let correta = "A";
        if (cB === "true") correta = "B";
        if (cC === "true") correta = "C";
        if (cD === "true") correta = "D";
        
        return `opcoes: [
      { label: "A", valor: ${vA} },
      { label: "B", valor: ${vB} },
      { label: "C", valor: ${vC} },
      { label: "D", valor: ${vD} },
    ],
    correta: "${correta}",
    explicacao:`;
    });
    
    fs.writeFileSync(pathMetrologia, content, 'utf8');
    console.log('Fixed metrologia-quizzes.ts options');
}
