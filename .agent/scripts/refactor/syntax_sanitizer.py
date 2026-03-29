import os
import re

p = 'src/components/aulas/matematica/AulaConjuntos.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Corrigir props corrompidas do tipo prop=valor} ou prop=valor
    # Procuramos por padrões de props sem a abertura { mas com o fechamento }
    c = re.sub(r'(\w+)=([0-9a-zA-Z\.\[\]]+)\}', r'\1={\2}', c)
    # Procurar por moduloNumero=1 (sem chaves) e colocar
    c = re.sub(r'(\w+)=([0-9]+)(\s)', r'\1={\2}\3', c)
    c = re.sub(r'(\w+)=(mv\[\d+\])(\s)', r'\1={\2}\3', c)

    # 2. Corrigir as bonecas russas de chaves nas aulas
    # Ex: { "{ "{{ "{x | x ...}" }" }" } -> { "{x | x ...}" }
    # Vamos fazer um replace iterativo até ficar limpo
    for _ in range(5):
        c = c.replace('{ "{ "', '{ "')
        c = c.replace('" }" }', '" }')
        c = c.replace('{ "{{ "', '{ "')
        c = c.replace('" }}" }', '" }')
        c = c.replace('{ "{ "{{ "{', '{ "{')
        c = c.replace('}" }" }" }', '}" }')

    # 3. Corrigir falha sistêmica de objetos literais que ficaram sem vírgulas ou fechamentos
    # Ex: video={{ ... } Sem vírgula entre props
    # (Este é o passo mais difícil via Regex, mas vamos tentar o comum)
    c = c.replace('}\n            resumoVisual', '},\n            resumoVisual')
    c = c.replace('}\n            index', '},\n            index')

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaConjuntos.tsx SANITIZED.")
