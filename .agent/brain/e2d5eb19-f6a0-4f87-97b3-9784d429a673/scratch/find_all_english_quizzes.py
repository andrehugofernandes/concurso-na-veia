import os
import re

dir_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles"
files = [f for f in os.listdir(dir_path) if f.endswith(".tsx") and f.startswith("Aula")]

for file in files:
    file_path = os.path.join(dir_path, file)
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "QuizInterativo" in content:
        print(f"=== File: {file} ===")
        # Encontra todas as chamadas de QuizInterativo
        # Pega a linha da chamada e algumas seguintes
        lines = content.splitlines()
        for i, line in enumerate(lines):
            if "<QuizInterativo" in line:
                snippet = "\n".join(lines[i:i+8])
                print(f"Line {i+1}:\n{snippet}\n")
        print("="*40)
