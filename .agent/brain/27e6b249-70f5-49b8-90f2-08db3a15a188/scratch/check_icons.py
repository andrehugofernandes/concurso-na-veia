
import re
import os

def check_icons(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Encontrar todos os ícones Lu* usados no JSX (ex: <LuIconName ...)
    used_icons = set(re.findall(r'<Lu([a-zA-Z0-9]+)', content))
    # Adicionar Lu de volta
    used_icons = {f"Lu{icon}" for icon in used_icons}
    
    # Encontrar todos os ícones Lu* importados de react-icons/lu
    import_match = re.search(r'import\s+\{([^}]+)\}\s+from\s+"react-icons/lu"', content)
    if not import_match:
        import_match = re.search(r"import\s+\{([^}]+)\}\s+from\s+'react-icons/lu'", content)
        
    imported_icons = set()
    if import_match:
        icons_text = import_match.group(1)
        # Lidar com aliases (ex: LuCirclePlay as LuPlayCircle)
        for part in icons_text.split(','):
            part = part.strip()
            if not part: continue
            if ' as ' in part:
                # O nome usado no código é o alias
                alias = part.split(' as ')[1].strip()
                imported_icons.add(alias)
            else:
                imported_icons.add(part.strip())
                
    missing = used_icons - imported_icons
    return list(missing), list(used_icons), list(imported_icons)

files = [
    r'c:\Workspace\petrobras-quest\src\components\aulas\portugues\AulaInterpretacaoTexto.tsx',
    r'c:\Workspace\petrobras-quest\src\components\aulas\portugues\AulaConcordancia.tsx',
    r'c:\Workspace\petrobras-quest\src\components\aulas\portugues\AulaClassesPalavras.tsx'
]

for f in files:
    if os.path.exists(f):
        missing, used, imported = check_icons(f)
        print(f"Arquivo: {os.path.basename(f)}")
        if missing:
            print(f"  Ícones FALTANDO: {missing}")
        else:
            print("  Todos os ícones estão importados corretamente.")
    else:
        print(f"Arquivo não encontrado: {f}")
