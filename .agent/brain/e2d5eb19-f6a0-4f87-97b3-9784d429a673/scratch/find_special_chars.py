import os, re

files = [
    "src/components/aulas/ingles/AulaTextComprehension.tsx",
    "src/components/aulas/ingles/AulaVocabulary.tsx",
    "src/components/aulas/ingles/AulaVerbTenses.tsx",
    "src/components/aulas/ingles/AulaReadingStrategies.tsx",
    "src/components/aulas/ingles/AulaFalseCognates.tsx"
]

special_patterns = [
    r'①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩',
    r'✅|❌|❓|✓|✔|✗'
]

report = []

for file in files:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for idx, line in enumerate(lines):
        line_num = idx + 1
        found = []
        for p in special_patterns:
            matches = re.findall(p, line)
            if matches:
                found.extend(matches)
        if found:
            report.append(f"{file} L{line_num}: {found} -> '{line.strip()}'")

log_path = "c:/Users/andre.hugo/.gemini/antigravity/brain/e2d5eb19-f6a0-4f87-97b3-9784d429a673/scratch/find_special_chars.txt"
with open(log_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(report))

print(f"Report saved. Found {len(report)} matches.")
