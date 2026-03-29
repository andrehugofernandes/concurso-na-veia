import os

target = "src/components/aulas/matematica/AulaConjuntos.tsx"
if os.path.exists(target):
    with open(target, 'r', encoding='utf-8') as f:
        c = f.read()
    
    # Limpa os restos dos scripts anteriores
    c = c.replace('{"{"}', '{')
    c = c.replace('{"}"}', '}')
    c = c.replace('__DOUBLE_PROP_END__', '}}')
    c = c.replace('__FUNCTION_START__', '{')
    
    # Limpar qualquer lixo gerado por regex falhas
    import re
    c = re.sub(r'__DOUBLE_PROP_(\w+)_START__', r'\1={{', c)
    c = re.sub(r'__PROP_(\w+)_START__', r'\1={', c)
    c = re.sub(r'__PROP_(\w+)_END__', r'}', c)
    c = re.sub(r'__IMPORT_START__', r'', c) # Corrigi para não deixar nada
    c = re.sub(r'__IMPORT_END__', r'', c)
    
    # Se gerou aspas duplas envolta de chaves escapadas, limpa também
    c = c.replace('"{{"', '{')
    c = c.replace('"}}"', '}')
    
    # Resolve o problema das chaves encadeadas que o view_file mostrou
    c = c.replace('""{', '{')
    c = c.replace('}""', '}')

    with open(target, 'w', encoding='utf-8') as f:
        f.write(c)
    print("✅ AulaConjuntos.tsx purificada.")
