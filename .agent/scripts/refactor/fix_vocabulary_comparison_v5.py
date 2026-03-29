import os
import re

p = 'src/components/aulas/ingles/AulaVocabulary.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Trocar Tag ComparisonSide -> Comparison
    c = c.replace('<ComparisonSide', '<Comparison title="Análise de Uso"')

    # 2. Injetar props description e variant nos objetos left/right
    # left={{ title: "❌ Errado", content: "..." }}
    # -> left={{ title: "...", content: "...", description: "", variant: "danger" }}
    
    # Heurística: Se o título tem ❌ -> variant: "danger"
    # Se o título tem ✅ -> variant: "success"
    
    def fix_side(match):
        side = match.group(1) # left ou right
        title = match.group(2)
        content = match.group(3)
        
        variant = "info"
        if "❌" in title or "Errado" in title: variant = "danger"
        elif "✅" in title or "Correto" in title or "Em Petrobras" in title: variant = "success"
        
        return f'{side}={{ {{ title: {title}, content: {content}, description: "Contexto Petrobras", variant: "{variant}" }} }}'

    # Regex que pega left={{ title: ..., content: ... }}
    c = re.sub(
        r'(left|right)=\{\{\s*title:\s*(.*?),?\s*content:\s*(.*?)\s*\}\}',
        fix_side,
        c,
        flags=re.DOTALL
    )

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaVocabulary.tsx Comparison Component Fully Refactored.")
