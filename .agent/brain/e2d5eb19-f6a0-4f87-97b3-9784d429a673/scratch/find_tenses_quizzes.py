import re

path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaVerbTenses.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

matches = list(re.finditer(r"QuizInterativo", content))
print(f"Found {len(matches)} occurrences in AulaVerbTenses.tsx")
for i, m in enumerate(matches[:3]):
    start = max(0, m.start() - 50)
    end = min(len(content), m.end() + 150)
    print(f"Match {i+1}: ... {content[start:end]} ...")
