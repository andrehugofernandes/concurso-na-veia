import os
import re

p = 'src/components/aulas/matematica/AulaConjuntos.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Resetar chaves corrompidas para um estado limpo (sem escapes estranhos)
    c = c.replace("{ '{' }", "{")
    c = c.replace("{ '}' }", "}")
    c = c.replace('{ "{" }', "{")
    c = c.replace('{ "}" }', "}")
    c = c.replace('{{ "', '{ "')
    c = c.replace('" }}', '" }')

    # 2. Corrigir os casos específicos de "vazamento de código" em matemática
    # O padrão {{x | x ...}} ou {x, y, z} que não seja prop
    
    # Heurística: se for P = { ... } dentro de um elemento, deve ser string
    def safe_math_render(match):
        pre = match.group(1)
        content = match.group(2)
        # Se contiver pipe |, vírgula , ou reticências ..., e estiver em contexto de texto
        if '|' in content or ',' in content or '...' in content or '<' in content or '>' in content:
             # Retornamos escapado de forma que o build ACEITE (usando strings JSX)
             # Substituímos o < e > internos para evitar erro de tag
             safe_content = content.replace('<', '&lt;').replace('>', '&gt;')
             return f'{pre}{{ "{ " }{safe_content}{{ " }" }}'
        return match.group(0)

    # Aplica em padrões comuns de conjuntos que quebram o código
    c = re.sub(r'([A-Z0-9]\s*=\s*)\{(.*?)\}', r'\1{ "{\2}" }', c)
    c = re.sub(r'(\{)\s*([a-zA-Z0-9\s|∈ℕℤℚℝ\.]*[|,].*?)(\})', r'{ "{\2}" }', c)

    # 3. Limpar de novo os imports que o regex acima pode ter pego (imports não tem vírgulas no centro normalmente, mas de segurança:)
    def clean_imports(match):
        return match.group(0).replace('{ "{', '{ ').replace('}" }', ' }')
    c = re.sub(r'import\s+.*?from\s+".*?";', clean_imports, c, flags=re.DOTALL)

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaConjuntos.tsx RECONSTRUCTED.")
