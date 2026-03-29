import os
import re

p = 'src/components/aulas/ingles/AulaVocabulary.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. ModuleSectionHeader: Traduzir props titulo -> title e numero -> index
    # <ModuleSectionHeader titulo="Upstream..." />
    c = c.replace('<ModuleSectionHeader titulo=', '<ModuleSectionHeader title=')
    
    # Adicionar index se não houver (para não quebrar no tsc se for obrigatório)
    # <ModuleSectionHeader title="Upstream..." /> -> <ModuleSectionHeader index={1} title="..." />
    # Vou tentar injetar um index sequencial ou um placeholder "★"
    
    def inject_index(match):
        props = match.group(1)
        if 'index={' not in props:
            return f'<ModuleSectionHeader index="*" {props}'
        return f'<ModuleSectionHeader {props}'

    c = re.sub(r'<ModuleSectionHeader\s+(.*?)\s*>', inject_index, c)

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaVocabulary.tsx ModuleSectionHeader Props Fixed (titulo -> title, index added).")
