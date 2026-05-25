import re

filepath = r"src/components/aulas/administracao/AulaLogisticaSuprimento.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for renderModulo in file
matches = re.findall(r'renderModulo\d+', content)
print(f"renderModulo occurrences in Logistica: {matches}")

# Let's search for TabsContent
tabs = re.findall(r'<TabsContent value="modulo-(\d+)"', content)
print(f"TabsContent value=modulo-* in Logistica: {tabs}")
