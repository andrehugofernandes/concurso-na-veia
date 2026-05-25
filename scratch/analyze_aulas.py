import re

path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Identificar emojis na faixa de unicode de emojis
emoji_pattern = re.compile(
    "["
    "\U0001f000-\U0001ffff"
    "\U00002000-\U00003000"  # inclui alguns symbols e dingbats
    "]",
    re.UNICODE
)

lines = content.split('\n')
output_lines = []

for idx, line in enumerate(lines):
    # Vamos achar qualquer caractere não-ASCII ou emojis específicos
    matches = []
    for char in line:
        if ord(char) > 127:
            # Pegar apenas emojis, ignorando caracteres com acento (á, é, í, ó, ú, ç, etc.)
            if ord(char) > 255 or char in "❌✅⚠️ℹ️💡🎯🚀❓":
                matches.append(char)
                
    if matches:
        in_flipcard = False
        # Verificar se está próximo de um FlipCard
        for up_line in lines[max(0, idx-10):idx]:
            if '<FlipCard' in up_line:
                in_flipcard = True
                break
        output_lines.append(f"Linha {idx+1} (FlipCard={in_flipcard}): {line.strip()} | Emojis: {''.join(matches)}")

with open(r"c:\Workspace\petrobras-quest\scratch\emoji_analysis.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(output_lines))

print("Analise salva com sucesso.")
