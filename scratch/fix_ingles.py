import re
import os

file_ingles = 'src/components/aulas/ingles/AulaTextComprehension.tsx'
if os.path.exists(file_ingles):
    with open(file_ingles, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(r'modulo=(\{\d+\})', r'numero=\1', content)
    content = re.sub(r'<Passo\s+numero=', r'<Passo passo=', content)
    content = re.sub(r'descricao=(["\'][^"\']+["\'])', r'children=\1', content)
    content = re.sub(r'lado1=\{[^}]+\}', '', content)
    content = re.sub(r'lado2=\{[^}]+\}', '', content)

    with open(file_ingles, 'w', encoding='utf-8') as f:
        f.write(content)

path_manut = 'src/components/aulas/manutencao/data/metrologia-quizzes.ts'
if os.path.exists(path_manut):
    with open(path_manut, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("from '../shared'", "from '@/components/aulas/shared'")
    with open(path_manut, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed ingles and manutencao")
