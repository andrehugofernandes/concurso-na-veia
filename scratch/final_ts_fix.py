# -*- coding: utf-8 -*-
import re

# Fix GeometriaAnalitica
file1 = 'src/components/aulas/matematica/AulaGeometriaAnalitica.tsx'
with open(file1, 'r', encoding='utf-8') as f:
    content1 = f.read()

# Remove moduleId property from QuestaoResolvidaStepByStep
content1 = re.sub(r'\s*moduleId=["\'][^"\']+["\']', '', content1)
with open(file1, 'w', encoding='utf-8') as f:
    f.write(content1)

# Fix GeometriaEspacial
file2 = 'src/components/aulas/matematica/AulaGeometriaEspacial.tsx'
with open(file2, 'r', encoding='utf-8') as f:
    content2 = f.read()

lines2 = content2.split('\n')
for i in range(max(0, 2145), min(len(lines2), 2165)):
    if 'icone=' in lines2[i]:
        lines2[i] = re.sub(r'\s*icone=["\'][^"\']*["\']', '', lines2[i])
        lines2[i] = re.sub(r'\s*icone=\{[^}]+\}', '', lines2[i])
with open(file2, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines2))

print('Fixed remaining specific TS errors.')
