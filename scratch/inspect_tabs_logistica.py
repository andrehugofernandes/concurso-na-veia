import re

filepath = r"src/components/aulas/administracao/AulaLogisticaSuprimento.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

for m in range(1, 11):
    pat = rf'<TabsContent\s+value=["\']modulo-{m}["\'][^>]*>'
    matches = list(re.finditer(pat, content))
    print(f"Módulo {m}: {len(matches)} matches")
    for match in matches:
        print(f"  {match.group(0)}")
