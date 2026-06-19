import os
import re

path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaReadingStrategies.tsx"
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()
    
    for idx, line in enumerate(lines):
        if any(c in line for c in ['ð', 'Ÿ', 'â', 'œ', 'Ã', 'Â', '€', '™', '']):
            # Print line if it matches
            print(f"Line {idx+1}: {line.strip()[:120]}")
else:
    print("File not found")
