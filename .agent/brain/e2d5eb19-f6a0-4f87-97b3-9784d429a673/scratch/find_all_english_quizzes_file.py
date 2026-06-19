import os

dir_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles"
files = [f for f in os.listdir(dir_path) if f.endswith(".tsx") and f.startswith("Aula")]

output_lines = []

for file in files:
    file_path = os.path.join(dir_path, file)
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    
    if "QuizInterativo" in content:
        output_lines.append(f"=== File: {file} ===")
        lines = content.splitlines()
        for i, line in enumerate(lines):
            if "<QuizInterativo" in line:
                snippet = "\n".join(lines[i:i+8])
                output_lines.append(f"Line {i+1}:\n{snippet}\n")
        output_lines.append("="*40 + "\n")

with open(r"C:\Users\andre.hugo\.gemini\antigravity\brain\e2d5eb19-f6a0-4f87-97b3-9784d429a673\scratch\quizzes_found.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(output_lines))

print("Saved output to quizzes_found.txt successfully.")
