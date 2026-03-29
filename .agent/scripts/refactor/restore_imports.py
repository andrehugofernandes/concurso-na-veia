import os
import re

p = 'src/components/aulas/matematica/AulaConjuntos.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Corrigir imports estilhaçados (os maiores vilões do build)
    c = c.replace("{ '{' }", "{")
    c = c.replace("{ '}' }", "}")
    
    # 2. Re-escapar APENAS o que parece ser conteúdo didático matemático
    # Vou usar uma estratégia MAIS SEGURA:
    # Procura por números ou reticências rodeados por chaves FORA de declarações de código
    
    # Primeiro, vamos "des-escapar" tudo (feito acima) para ter um estado limpo.

    # Agora, vamos escapar APENAS o conteúdo de tags de texto (p, h1-h6, strong, li, etc)
    # que tenham chaves{}.
    
    def protect_math_in_jsx(match):
        pre = match.group(1)
        content = match.group(2)
        post = match.group(3)
        # Se contiver vírgula ou reticências, é matemático
        if ',' in content or '...' in content:
            # Escapa APENAS o conteúdo didático
            return f'{pre}{{ "{" }}{content}{{ "}" }}{post}'
        return match.group(0)

    # Procura por conteúdo entre tags JSX que contenham chaves {}
    # Esse Regex é perigoso em arquivos grandes, mas vamos tentar em pedaços ou simplificar
    # Vamos focar em padrões específicos de exemplo didático:
    # Ex: P = {1, 2, 3}
    
    c = re.sub(r'([A-Z0-9]\s*=\s*)\{(.*?)\}', r'\1{ "{\2}" }', c) 
    # Ex: P = {1, 2, 3} -> P = { "{1, 2, 3}" }

    # Ajustar para o que vimos ali de Slides e Conteúdo
    # "P = { '{' }2, 4, 6...{ '}' }" -> "P = { '{' }2, 4, 6...{ '}' }"
    # Na verdade, a sintaxe { '{' } ... { '}' } é MUITO segura se não estiver em imports.

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaConjuntos.tsx Imports Restored & Math Protected.")
