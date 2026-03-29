import os
import re

p = 'src/components/aulas/ingles/AulaVocabulary.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Remover onComplete do ModuleConsolidation (ele não aceita)
    c = re.sub(r'onComplete=\{\(\)\s*=>\s*handleModuleComplete\(.*?\)\}', '', c)

    # 2. Ajustar possíveis espaçamentos duplos/tags mal fechadas
    c = c.replace('<ModuleConsolidation \n', '<ModuleConsolidation\n')
    
    # 3. Mapear label -> title dentro do Comparison
    # De: left={{ label: "...", content: "..." }}
    # Para: left={{ title: "...", content: "...", description: "", variant: "emerald" }}
    c = re.sub(
        r'left=\{\{\s*label:\s*(.*?),', 
        r'left={{ title: \1, description: "Referência Técnica", variant: "emerald" as any,', 
        c
    )
    c = re.sub(
        r'right=\{\{\s*label:\s*(.*?),', 
        r'right={{ title: \1, description: "Aplicação Correta", variant: "rose" as any,', 
        c
    )

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaVocabulary.tsx Cleaned Up (onComplete removed, Comparison fixed).")
