
with open('src/components/aulas/portugues/AulaConcordancia.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    # Very simple tag detection (won't handle all cases but good for divs)
    if '<div' in line and '/>' not in line:
        stack.append(i + 1)
    if '</div>' in line:
        if stack:
            stack.pop()
        else:
            print(f"Extra </div> at line {i + 1}")

if stack:
    print(f"Unclosed <div> started at lines: {stack}")
