import os
import re

pb_file = r"C:\Users\andre.hugo\.gemini\antigravity-ide\conversations\d10d56e8-1dda-437b-b5f7-c08b1da45e12.pb"
print(f"Scaneando todas as strings de: {pb_file}")

with open(pb_file, 'rb') as f:
    data = f.read()

# Extrair todas as sequencias de bytes imprimiveis ASCII (32 a 126) + acentuados
# Comprimento minimo 15
strings = []
current = []
for b in data:
    if 32 <= b <= 126 or 192 <= b <= 255 or b in [10, 13, 9]:
        current.append(chr(b) if b < 128 else f"\\x{b:02x}")
    else:
        if len(current) >= 15:
            strings.append("".join(current))
        current = []
if len(current) >= 15:
    strings.append("".join(current))

print(f"Total de strings com length >= 15: {len(strings)}")

# Filtrar strings que se parecem com texto legivel (mais de 4 letras comuns e espacos)
readable_strings = []
for s in strings:
    # Se contiver espacos e letras do alfabeto portugues
    letters = sum(1 for c in s if c.isalpha())
    spaces = s.count(' ')
    if letters > 10 and spaces > 2:
        readable_strings.append(s)

print(f"Total de strings parecidas com texto: {len(readable_strings)}")
print("\nTop 15 maiores strings parecidas com texto:")
readable_strings.sort(key=len, reverse=True)
for s in readable_strings[:15]:
    print(f" - {len(s)} chars: {s[:200]}...")
