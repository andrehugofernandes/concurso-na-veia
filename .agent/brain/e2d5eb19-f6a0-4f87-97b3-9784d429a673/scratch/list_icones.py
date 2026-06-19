import re

with open(r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaReadingStrategies.tsx", "r", encoding="utf-8", errors="replace") as f:
    content = f.read()

# Find all occurrences of icone: "..." or icone: <...>
icones = re.findall(r'icone:\s*("[^"]*"|<[^>]*>)', content)
for i, icon in enumerate(icones):
    print(f"Icon {i+1}: {icon}")
