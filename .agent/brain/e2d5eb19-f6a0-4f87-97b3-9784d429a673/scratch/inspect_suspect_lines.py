import os

path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaReadingStrategies.tsx"
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

# Let's inspect specific characters and lines with mojibake
# We can print using repr() to avoid console encoding crashes
lines = content.splitlines()
for idx, line in enumerate(lines):
    if any(c in line for c in ['\xc3', '\xc2', '\xe2', '\x8f', '\u0178', 'ï', '¸']):
        # If it contains suspect characters
        print(f"Line {idx+1}: {repr(line[:120])}")
