
import re

with open('src/components/aulas/portugues/AulaConcordancia.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    # Find all <div (not self-closing)
    opens = re.findall(r'<div(?!\s+[^>]*/>)', line)
    closes = re.findall(r'</div>', line)
    
    for _ in opens:
        stack.append(i + 1)
    
    for _ in closes:
        if stack:
            opened_at = stack.pop()
            # print(f"Closed div from line {opened_at} at line {i+1}")
        else:
            print(f"ERROR: Extra </div> at line {i + 1}")

if stack:
    for line_num in stack:
        print(f"ERROR: Unclosed <div> from line {line_num}")
