path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

lines = content.split('\n')
for idx, line in enumerate(lines):
    if 'ModuleSectionHeader' in line:
        print(f"Linha {idx+1}: {line.strip()}")
        # print sublinhas
        for sub_line in lines[idx:idx+4]:
            print(f"  {sub_line.strip()}")
