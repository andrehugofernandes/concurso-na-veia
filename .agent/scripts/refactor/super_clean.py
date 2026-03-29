import os

p = 'src/components/aulas/matematica/AulaConjuntos.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    
    # 1. Limpar a sujeira bizarra de strings escapadas dentro de strings
    c = c.replace('{"{"}"{"{"}"}', '{')
    c = c.replace('{"}"}"{"}"}"}', '}')
    c = c.replace('{"{"}{"{"}', '{')
    c = c.replace('{"}"}{"}"}', '}')
    
    # 2. Corrigir o caso da linha 5 e 26 que o view_file mostrou
    c = c.replace('import {"{"}"{"{"}"}', 'import {')
    c = c.replace('export default function AulaConjuntos({"{"}"{"{"}"}', 'export default function AulaConjuntos({')

    # 3. Limpeza genérica de escapes remanescentes
    c = c.replace('{"{"}', '{')
    c = c.replace('{"}"}', '}')
    
    # 4. Corrigir aspas extras que podem ter sido geradas
    c = c.replace('""{', '{')
    c = c.replace('}""', '}')
    c = c.replace('"{', '{')
    c = c.replace('}"', '}')
    
    # 5. GARANTIR QUE IMPORTS NÃO TENHAM ASPAS ANTES DA CHAVE
    c = c.replace('import "{', 'import {')
    c = c.replace('import " {', 'import {')

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaConjuntos.tsx super-limpa.")
