import re

with open(r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaVocabulary.tsx", "r", encoding="utf-8") as f:
    content = f.read()

matches = list(re.finditer(r"QuizInterativo", content))
print(f"Found {len(matches)} occurrences in AulaVocabulary.tsx")
for i, m in enumerate(matches):
    start = max(0, m.start() - 50)
    end = min(len(content), m.end() + 150)
    print(f"Match {i+1}: ... {content[start:end]} ...")
