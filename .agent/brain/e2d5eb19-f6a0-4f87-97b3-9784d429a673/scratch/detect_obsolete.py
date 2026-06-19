import os

files = [
    "src/components/aulas/ingles/AulaTextComprehension.tsx",
    "src/components/aulas/ingles/AulaVocabulary.tsx",
    "src/components/aulas/ingles/AulaVerbTenses.tsx",
    "src/components/aulas/ingles/AulaReadingStrategies.tsx",
    "src/components/aulas/ingles/AulaFalseCognates.tsx"
]

report = []

for file in files:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Procura por "lado1=" ou "lado2=" (ComparisonSide obsoleto)
    has_lado = "lado1=" in content or "lado2=" in content
    # Procura por "descricao=" dentro de uma tag AlertBox
    # Vamos fazer uma busca simplificada: "descricao=" ocorrendo perto de "AlertBox"
    # ou simplesmente ver se "descricao=" existe no arquivo, mas excluindo a do topo (AulaProps ou metadata)
    # Uma forma mais precisa é ler linha a linha e encontrar tags AlertBox com descricao=
    has_alert_desc = False
    lines = content.splitlines()
    for idx, line in enumerate(lines):
        if "AlertBox" in line and "descricao=" in line:
            has_alert_desc = True
            report.append(f"{file} L{idx+1}: AlertBox has 'descricao=' in the same line")
        elif "AlertBox" in line:
            # verifica se as próximas 5 linhas têm 'descricao='
            for offset in range(1, 6):
                if idx + offset < len(lines):
                    next_line = lines[idx+offset]
                    if "descricao=" in next_line and "<" not in next_line:
                        has_alert_desc = True
                        report.append(f"{file} L{idx+offset+1}: AlertBox has 'descricao=' near it: '{next_line.strip()}'")
                        break

    if has_lado:
        report.append(f"{file}: Contains obsolete ComparisonSide (lado1/lado2)")

print("\n".join(report))
