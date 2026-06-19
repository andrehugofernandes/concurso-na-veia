import re
import os

files = [
    'AulaReadingStrategies.tsx',
    'AulaVocabulary.tsx',
    'AulaVerbTenses.tsx',
    'AulaFalseCognates.tsx'
]

dir_path = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles"

for filename in files:
    path = os.path.join(dir_path, filename)
    if not os.path.exists(path):
        print(f"File not found: {filename}")
        continue
        
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
        
    print(f"=== {filename} ===")
    
    # 1. maceteVisual
    mv_calls = re.findall(r'maceteVisual', content)
    print(f"  maceteVisual occurrences: {len(mv_calls)}")
    
    # 2. AlertBox com descricao
    ab_calls = re.findall(r'<AlertBox[^>]*\bdescricao\b', content)
    print(f"  AlertBox with 'descricao' occurrences: {len(ab_calls)}")
    
    # 3. ComparisonSide com lado1 ou lado2
    cs_calls = re.findall(r'<ComparisonSide[^>]*\blado(1|2)\b', content)
    print(f"  ComparisonSide with 'lado1'/'lado2' occurrences: {len(cs_calls)}")
    
    # 4. Emojis corrompidos
    corrupt_emojis = re.findall(r'ðŸ|â€”|âœ“|â‰|ðŸ‘‘|ðŸŽ¯|ðŸ§ ', content)
    print(f"  Corrupt emoji/special char occurrences: {len(corrupt_emojis)}")
    
    # 5. QuizInterativo calls count
    qi_calls = re.findall(r'<QuizInterativo\b', content)
    print(f"  QuizInterativo occurrences: {len(qi_calls)}")
    print()
