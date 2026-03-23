import os
import re

def check_files():
    base_dir = r'c:\Workspace\petrobras-quest\src\components\aulas'
    files_to_check = []
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.startswith('Aula') and file.endswith('.tsx'):
                files_to_check.append(os.path.join(root, file))
    
    missing_props = []
    for filepath in files_to_check:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            if '<AulaTemplate' in content:
                if 'isModuleUnlocked' not in content:
                    missing_props.append(filepath)
    
    if missing_props:
        print("Files missing isModuleUnlocked in AulaTemplate:")
        for f in missing_props:
            print(f)
    else:
        print("All files have isModuleUnlocked.")

check_files()
