import re

file_path = 'c:/Workspace/petrobras-quest/src/components/aulas/seguranca/AulaNr10.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Remove icone prop from ModuleBanner
content = re.sub(r'(\s*<ModuleBanner\b[^>]*?)\s+icone=\{[^}]+\}', r'\1', content)

# Fix 2: Remove onComplete from ModuleConsolidation
# Make sure to handle multiple lines like \n            onComplete={() => handleModuleComplete("modulo-1")}
content = re.sub(r'(\s*<ModuleConsolidation\b[^>]*?)\s+onComplete=\{[^}]+\}', r'\1', content)

# Fix 3: Add titulo to QuizInterativo
content = re.sub(r'(<QuizInterativo\b)', r'\1 titulo="Simulado de Conhecimento"', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('AulaNr10.tsx fixed!')
