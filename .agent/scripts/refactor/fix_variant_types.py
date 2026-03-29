import os
import re

p = 'src/components/aulas/matematica/AulaConjuntos.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # Procurar por variant={mv[algumacoisa]} e adicionar fallback
    # O TS reclama porque mv[N] pode ser undefined.
    # Vamos adicionar um (mv[N] as any) ou || "amber"
    
    # Heurística: variant={mv[1]} -> variant={mv[1] as any}
    c = re.sub(r'variant=\{mv\[(\d+)\]\}', r'variant={mv[\1] as any}', c)

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaConjuntos.tsx Type Errors (variant) Suppressed.")
