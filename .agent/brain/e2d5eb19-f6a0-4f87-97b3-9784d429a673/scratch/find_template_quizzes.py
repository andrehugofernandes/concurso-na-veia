import re

with open(r"c:\Workspace\petrobras-quest\src\components\aulas\portugues\AulaInterpretacaoTexto.tsx", "r", encoding="utf-8") as f:
    content = f.read()

matches = list(re.finditer(r"<QuizInterativo[\s\S]*?/>", content))
print(f"Found {len(matches)} occurrences in AulaInterpretacaoTexto.tsx")
for i, m in enumerate(matches[:2]):
    print(f"Occurrence {i+1}:\n{m.group(0)}\n")
