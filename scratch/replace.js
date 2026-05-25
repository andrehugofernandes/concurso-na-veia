const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'aulas', 'portugues', 'AulaClassesPalavras.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace mv[N].cor as any with mv[N]
content = content.replace(/variant=\{mv\[(\d+)\]\.cor as any\}/g, 'variant={mv[$1]}');
content = content.replace(/variant=\{mv\[(\d+)\]\.cor\}/g, 'variant={mv[$1]}');

// 2. Replace maceteVisual={{ with sinteseEstrategica={{
content = content.replace(/maceteVisual=\{\{/g, 'sinteseEstrategica={{');

// 3. Replace the old FlipCards with the premium ones
const premiumFlipCard1 = `<FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                    <LuRepeat className="w-12 h-12 text-amber-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Verbo → Subst.
                  </span>
                  <span className="text-sm text-amber-500/80 font-medium">
                    Verbo Substantivado
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Exemplo</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    "<strong>O cantar</strong> dos pássaros é sinal de chuva."
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Aqui, o artigo "O" substantivou a ação.
                  </p>
                </div>
              }
              categoria="Verbo Substantivado"
              variant="amber"
            />`;

const premiumFlipCard2 = `<FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20">
                    <LuShieldAlert className="w-12 h-12 text-orange-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Advérbio → Subst.
                  </span>
                  <span className="text-sm text-orange-500/80 font-medium">
                    Advérbio Substantivado
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-orange-500 font-bold border-b border-orange-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Exemplo</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    "Recebemos <strong>um não</strong> rotundo da gerência."
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    O artigo indefinido "UM" operou a mudança.
                  </p>
                </div>
              }
              categoria="Advérbio Substantivado"
              variant="orange"
            />`;

const premiumFlipCard3 = `<FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                    <LuPalette className="w-12 h-12 text-amber-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Adjetivo → Subst.
                  </span>
                  <span className="text-sm text-amber-500/80 font-medium">
                    Adjetivo Substantivado
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Exemplo</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    "<strong>O azul</strong> do mar na Bacia de Campos."
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A cor tornou-se o objeto da frase.
                  </p>
                </div>
              }
              categoria="Adjetivo Substantivado"
              variant="amber"
            />`;

content = content.replace(/<FlipCard\s+cor="amber"\s+icone=\{<LuRepeat className="w-8 h-8" \/>\}\s+titulo="Verbo → Subst\."[\s\S]*?<\/div>\s*\}\s*\/>/m, premiumFlipCard1);

content = content.replace(/<FlipCard\s+cor="orange"\s+icone=\{<LuShieldAlert className="w-8 h-8" \/>\}\s+titulo="Advérbio → Subst\."[\s\S]*?<\/div>\s*\}\s*\/>/m, premiumFlipCard2);

content = content.replace(/<FlipCard\s+cor="amber"\s+icone=\{<LuPalette className="w-8 h-8" \/>\}\s+titulo="Adjetivo → Subst\."[\s\S]*?<\/div>\s*\}\s*\/>/m, premiumFlipCard3);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Replacement done");
