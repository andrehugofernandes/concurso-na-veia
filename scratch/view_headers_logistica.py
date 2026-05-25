import re

filepath = r"src/components/aulas/administracao/AulaLogisticaSuprimento.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

headers = re.findall(r'(<ModuleSectionHeader[^>]*>)', content)
for h in headers:
    print(h)
