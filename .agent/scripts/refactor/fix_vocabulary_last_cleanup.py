import os
import re

p = 'src/components/aulas/ingles/AulaVocabulary.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. TimelineItem: Forçar tradução de title e description
    # O script anterior pode ter falhado em pegar blocos multiline.
    c = c.replace('title={', 'titulo={')
    c = c.replace('description={', 'descricao={')
    # Pegar caso 'title="'
    c = re.sub(r'title="', 'titulo="', c)
    c = re.sub(r'description="', 'descricao="', c)

    # 2. ModuleConsolidation: Remover children residual
    # <ModuleConsolidation ...> ... </ModuleConsolidation> -> <ModuleConsolidation ... />
    c = re.sub(
        r'<ModuleConsolidation(.*?)\s*>\s*</ModuleConsolidation>',
        r'<ModuleConsolidation\1 />',
        c,
        flags=re.DOTALL
    )
    
    # Se sobrar texto entre as tags, remover.
    c = re.sub(
        r'<ModuleConsolidation(.*?)>(.*?)</ModuleConsolidation>',
        r'<ModuleConsolidation\1 />',
        c,
        flags=re.DOTALL
    )

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaVocabulary.tsx Children & Timeline Props Fixed.")
