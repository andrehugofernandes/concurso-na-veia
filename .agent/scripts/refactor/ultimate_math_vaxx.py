import os
import re

def vaxx(p):
    if not os.path.exists(p): return
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Primeiro limpamos resíduos de outros scripts (importante!)
    c = c.replace("{ '{' }", "{")
    c = c.replace("{ '}' }", "}")
    c = c.replace('{ "{ "', '{')
    c = c.replace('" }" }', '}')
    c = c.replace('{{', '{')
    c = c.replace('}}', '}')

    # 2. Agora, aplicamos a proteção em TODA a matemática didática
    # Heurística: se { } contém símbolos matemáticos, números isolados ou é usado em tags de texto
    # nós escapamos para o JSX não tentar interpretar como Código.
    
    # Vamos usar os escapes JSX string para serem 100% à prova de tsc: {"{"} e {"}"}
    
    # Regex para qualquer { e } que não pareça ser uma Prop do React (não precedido por =)
    # Mas cuidado com Props de Estilo style={{ }}
    
    # Estratégia: Escapar TODOS os { e } que NÃO estão em imports e NÃO são props
    # O jeito mais seguro em React de renderizar { ou } é {"{"} ou {"}"}
    
    # Vamos primeiro escapar os { } que estão EM tags de texto (p, strong, li, etc)
    # Procuramos o que está ENTRE > e <
    def jsx_text_fix(match):
        text = match.group(0)
        # Se for uma prop, pulamos (heurística de regex simples)
        if '=' in text: return text
        # Escapamos chaves
        text = text.replace('{', '{"{"}').replace('}', '{"}"}')
        return text

    # Aplicamos a proteção em conteúdos de tags
    c = re.sub(r'>([^<]*)<', lambda m: '>' + m.group(1).replace('{', '{"{"}').replace('}', '{"}"}') + '<', c)

    # 3. Restaurar as chaves de PROPS LEGÍTIMAS (elas foram escapadas pelo regex acima se estavam entre > e <?)
    # Não, o regex acima pega o que está fora de tags.
    
    # 4. Consertar os imports de novo (sempre!)
    def fix_imports(match):
        return match.group(0).replace('{"{"}', '{').replace('{"}"}', '}')
    c = re.sub(r'import\s+.*?from\s+".*?";', fix_imports, c, flags=re.DOTALL)
    # Consertar as props de componentes injetadas (ex: variant={mv[1]})
    c = re.sub(r'(\w+)={"{"}(.*?)?{"}"}', r'\1={\2}', c)

    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f"💉 {p} Fully Vaccinated.")

base = 'src/components/aulas/matematica/'
for f in os.listdir(base):
    if f.endswith('.tsx'):
        vaxx(os.path.join(base, f))

# E as outras matérias
for folder in ['src/components/aulas/ingles/', 'src/components/aulas/administracao/']:
    if os.path.exists(folder):
        for f in os.listdir(folder):
            if f.endswith('.tsx'):
                vaxx(os.path.join(folder, f))
