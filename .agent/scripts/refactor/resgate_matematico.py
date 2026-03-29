import os
import re

p = 'src/components/aulas/matematica/AulaConjuntos.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Escapar conjuntos matemáticos que usam { } COM vírgulas dentro mas SEM dois-pontos
    # (Objetos tem dois pontos {:}, conjuntos matemáticos tem {1, 2, 3})
    def escape_math(match):
        inner = match.group(1)
        # Se contiver ':' provavelmente é um objeto de prop ou dicionário
        if ':' in inner and not re.search(r'[^a-zA-Z0-9_$]:', inner): # Pobre heurística
             return match.group(0)
        # Se contiver vírgulas ou reticências ou for apenas números, é conjunto
        if ',' in inner or '...' in inner or inner.strip().isdigit():
             # Escapamos cada chave
             return "{ '{' }" + inner + "{ '}' }"
        return match.group(0)

    # Aplica em chaves duplas
    c = re.sub(r'\{\{(.*?)\}\}', escape_math, c)
    # Aplica em chaves simples que não são Props ( heurística: não precedido por '=' )
    def escape_simple_math(match):
        pre = match.group(1)
        content = match.group(2)
        if pre == '=': # Prop do React
             return match.group(0)
        if ',' in content or '...' in content or content.strip().isdigit():
             return pre + "{ '{' }" + content + "{ '}' }"
        return match.group(0)

    # Procura por { } que não venham logo após um =
    # Usamos lookbehind? PowerShell/Python regex...
    c = re.sub(r'([^=])\{(.*?)\}', escape_simple_math, c)
    
    # 2. Corrigir resíduos estúpidos que eu vi no view_file
    c = c.replace('import { {', 'import {')
    c = c.replace('import {{', 'import {')
    c = c.replace('import { {', 'import {')
    c = c.replace('{{ activeTab }', '{ activeTab }')
    c = c.replace('{{ setActiveTab }', '{ setActiveTab }')

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaConjuntos.tsx RESCURDED.")
