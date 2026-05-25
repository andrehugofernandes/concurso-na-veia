
import re

with open('src/components/aulas/portugues/AulaConcordancia.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    line_num = i + 1
    if line_num < 3980 or line_num > 4600:
        continue
        
    opens = re.findall(r'<div(?!\s+[^>]*/>)', line)
    closes = re.findall(r'</div>', line)
    
    for _ in opens:
        stack.append(line_num)
        print(f"{line_num}: OPEN div (stack size: {len(stack)})")
    
    for _ in closes:
        if stack:
            opened_at = stack.pop()
            print(f"{line_num}: CLOSE div from {opened_at} (stack size: {len(stack)})")
        else:
            print(f"{line_num}: ERROR: Extra </div>")
