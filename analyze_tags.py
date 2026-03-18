import re

content = open(r'src/components/aulas/administracao/AulaPlanejamentoEstrategico.tsx', encoding='utf-8').read()
lines = content.split('\n')

stack = []
for i, line in enumerate(lines[1788:], start=1789):
    # Find opening tags (not self-closing)
    for m in re.finditer(r'<(div|section|TabsContent)[\s>]', line):
        tag = m.group(1)
        rest = line[m.start():]
        if '/>' in rest:
            close_pos = rest.index('/>')
            gt_pos = rest.index('>') if '>' in rest else 9999
            if close_pos < gt_pos:
                continue
        stack.append((tag, i))
    # Find closing tags
    for m in re.finditer(r'</(div|section|TabsContent)>', line):
        tag = m.group(1)
        if stack and stack[-1][0] == tag:
            stack.pop()
        else:
            top = stack[-1] if stack else 'empty'
            print(f'MISMATCH line {i}: closing {tag} but stack top is {top}')

print(f'\nUnclosed tags ({len(stack)}):')
for tag, line_num in stack:
    print(f'  <{tag}> at line {line_num}')
