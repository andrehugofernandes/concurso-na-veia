import os

p = 'src/components/aulas/matematica/AulaConjuntos.tsx'
if os.path.exists(p):
    with open(p, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    
    # Lista de lixos conhecidos que os scripts anteriores podem ter gerado
    junk = [
        '{{"}', '{{{"}', '{"}', 
        '}"}', '}}"}', '}}}"}',
        '"{', '}"', '""',
        '{""}', '}""'
    ]
    
    # Limpando de forma segura
    for j in junk:
        # Mas não podemos remover '{' puras
        if j == '{"' or j == '"{':
             c = c.replace(j, '{')
        elif j == '}"' or j == '}"':
             c = c.replace(j, '}')
        else:
             c = c.replace(j, '')
             
    # Casos de substituição específicos capturados no view_file
    c = c.replace('import {{"}', 'import {')
    c = c.replace('import {"', 'import {')
    c = c.replace('titulo={{', 'titulo={')
    c = c.replace('}}titulo', '}titulo')
    c = c.replace('titulo={"}titulo', 'titulo={titulo}')
    
    # Garantindo que os exports e props fiquem perfeitos
    import re
    c = re.sub(r'export default function AulaConjuntos\(\{.*?\}', r'export default function AulaConjuntos({', c, flags=re.DOTALL | re.MULTILINE)
    
    # Corrigindo a Linha 1338 especificamente agora que limpamos
    # Ela estava assim: { '{' }0, 1, 2, ...{ '}' }
    # O clean pode ter estragado. Vamos forçar o certo.
    c = re.sub(r'p className="text-lg text-muted-foreground italic">\s*.*?0, 1, 2, ....*?\s*</p>', 
               r'p className="text-lg text-muted-foreground italic">\n                        { "{" }0, 1, 2, ...{ "}" }\n                      </p>', c)

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaConjuntos.tsx ATOMICALLY CLEANED.")
