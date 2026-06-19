import re

file_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"

with open(file_path, "r", encoding="utf-8", errors="replace") as f:
    content = f.read()

print("Checking AulaTextComprehension.tsx...")

# 1. Macete visual
mv_calls = re.findall(r'maceteVisual', content)
print(f"maceteVisual occurrences: {len(mv_calls)}")

# 2. AlertBox com descricao
ab_calls = re.findall(r'<AlertBox[^>]*\bdescricao\b', content)
print(f"AlertBox with 'descricao' occurrences: {len(ab_calls)}")

# 3. ComparisonSide com lado1 ou lado2
cs_calls = re.findall(r'<ComparisonSide[^>]*\blado(1|2)\b', content)
print(f"ComparisonSide with 'lado1'/'lado2' occurrences: {len(cs_calls)}")

# 4. Emojis corrompidos
corrupt_emojis = re.findall(r'ðŸ|â€”|âœ“|â‰', content)
print(f"Corrupt emoji/special char occurrences: {len(corrupt_emojis)}")
