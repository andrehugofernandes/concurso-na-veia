import os, sys

# Garante que o console use UTF-8 se formos imprimir
try:
    sys.stdout.reconfigure(encoding='utf-8')
except AttributeError:
    pass

files = [
    "src/components/aulas/ingles/AulaTextComprehension.tsx",
    "src/components/aulas/ingles/AulaVocabulary.tsx",
    "src/components/aulas/ingles/AulaVerbTenses.tsx",
    "src/components/aulas/ingles/AulaReadingStrategies.tsx",
    "src/components/aulas/ingles/AulaFalseCognates.tsx"
]

output_lines = []

for file in files:
    if not os.path.exists(file):
        continue
    output_lines.append(f"\n=== {file} ===")
    with open(file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for idx, line in enumerate(lines):
        line_num = idx + 1
        if "AlertBox" in line:
            output_lines.append(f"L{line_num}: {line.strip()}")
        if "ComparisonSide" in line:
            chunk = "".join(lines[idx:idx+15])
            output_lines.append(f"L{line_num} (ComparisonSide):\n{chunk.strip()}")
            output_lines.append("-" * 20)

log_path = "c:\\Users\\andre.hugo\\.gemini\\antigravity\\brain\\e2d5eb19-f6a0-4f87-97b3-9784d429a673\\scratch\\find_calls.txt"
with open(log_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(output_lines))

print("Log saved to scratch/find_calls.txt")
