import re

file_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "QuizInterativo" in line:
        # Pega as 6 linhas seguintes
        snippet = "".join(lines[i:i+8])
        print(f"Line {i+1}:\n{snippet}\n" + "-"*40)
