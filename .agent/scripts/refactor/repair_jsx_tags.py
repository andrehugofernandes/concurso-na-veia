import os
import re

p = 'src/components/aulas/ingles/AulaVocabulary.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Corrigir fechamento da tag ModuleConsolidation que perdeu o >
    # Se houver audio e em seguida </ModuleConsolidation>
    c = c.replace('artista: "Professor de Inglês" }}\n            \n           </ModuleConsolidation>', 'artista: "Professor de Inglês" }}\n          >\n          </ModuleConsolidation>')
    
    # 2. Refazer o replace se houver espaços diferentes
    c = re.sub(
        r'(audio=\{\{\s*audioUrl:\s*".*?"\s*\}\})\s+</ModuleConsolidation>',
        r'\1 > </ModuleConsolidation>',
        c,
        flags=re.DOTALL
    )

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaVocabulary.tsx JSX Syntax Repaired.")
