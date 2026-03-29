import os
import re

p = 'src/components/aulas/ingles/AulaVocabulary.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. No componente Comparison, trocar titulo={...} ou titulo="..." para title={...} ou title="..."
    # <Comparison titulo="Análise de Uso"
    c = c.replace('<Comparison titulo=', '<Comparison title=')
    
    # 2. Já haviamos corrigido os sub-objetos left/right no script anterior (fix_vocabulary_comparison_v5.py)
    # Mas vamos garantir que o title interno seja 'title'
    # left={{ title: "...", content: "...", description: "...", variant: "..." }}
    # O script anterior já havia gerado 'title' corretamente.

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaVocabulary.tsx Comparison Props Fixed (titulo -> title).")
