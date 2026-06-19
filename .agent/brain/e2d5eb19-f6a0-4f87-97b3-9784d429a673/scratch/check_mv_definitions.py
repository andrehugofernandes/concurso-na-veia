import re
import os

files = [
    'AulaConnectors.tsx',
    'AulaFalseCognates.tsx',
    'AulaReadingStrategies.tsx',
    'AulaVerbTenses.tsx',
    'AulaVocabulary.tsx'
]

dir_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles"

for filename in files:
    path = os.path.join(dir_path, filename)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        # Procura a definicao de mv
        mv_match = re.search(r'const\s+mv\b.*?;', content, re.DOTALL)
        if mv_match:
            print(f"File: {filename} | MV definition found:\n{mv_match.group(0)}\n")
        else:
            # Procura getModuleVariant
            gv_matches = re.findall(r'getModuleVariant\(\d+\)', content)
            print(f"File: {filename} | MV not found. getModuleVariant calls: {len(gv_matches)}")
