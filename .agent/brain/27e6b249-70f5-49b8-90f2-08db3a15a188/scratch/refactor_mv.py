import glob
import re

files = glob.glob('src/components/aulas/matematica/*.tsx')
print(f"Encontrados {len(files)} arquivos para processar.")

for f in files:
    # 1. Ler o conteúdo
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 2. Executar a regex
    new_content = re.sub(
        r'//\s*Variantes de cor[^\n]*\n+|const\s+mv\s*=\s*Object\.fromEntries\([\s\S]*?\)\s*as\s*Record[\s\S]*?;', 
        '', 
        content
    )
    
    # 3. Salvar apenas se houver modificações reais
    if len(new_content) < len(content):
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Modificado com sucesso: {f}")
    else:
        print(f"Nenhuma mudança necessária: {f}")
