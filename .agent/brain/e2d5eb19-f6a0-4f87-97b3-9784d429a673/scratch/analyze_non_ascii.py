import re

file_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaReadingStrategies.tsx"

with open(file_path, "r", encoding="utf-8", errors="replace") as f:
    content = f.read()

# Procura qualquer sequencia de caracteres nao-ascii
# ou sequencias tipicas de mojibake como ðŸ
matches = re.findall(r'[^\x00-\x7F]+', content)
print(f"Total non-ASCII sequences found: {len(matches)}")

# Imprime as primeiras 20 sequencias unicas e seus contextos
seen = set()
for match in matches:
    if match not in seen:
        seen.add(match)
        # Mostra o contexto de onde ocorre
        pos = content.find(match)
        start = max(0, pos - 40)
        end = min(len(content), pos + len(match) + 40)
        context = content[start:end].replace('\n', ' ')
        print(f"Match: {repr(match)} | Context: {context}")
        if len(seen) >= 30:
            break
