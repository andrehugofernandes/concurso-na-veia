# -*- coding: utf-8 -*-
import os
import re

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
AULAS_DIR = os.path.join(BASE_DIR, "src", "components", "aulas")

def fix_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content

    # 1. Fix variant={mv[i]} -> variant="blue"
    new_content = re.sub(r'variant=\{m?v\[[^\]]+\]\}', 'variant="blue"', new_content)
    new_content = re.sub(r'variant=\{colors\[[^\]]+\]\}', 'variant="blue"', new_content)
    
    # 2. Fix colors -> "blue"
    for color in ["purple", "emerald", "violet", "amber", "rose", "cyan", "slate"]:
        new_content = re.sub(f'variant="{color}"', 'variant="blue"', new_content)
        new_content = re.sub(f'variant={{\"{color}\"}}', 'variant="blue"', new_content)

    # 3. Fix onComplete signatures
    lines = new_content.split('\n')
    out_lines = []
    current_mod = "modulo-1"
    
    mod_regex = re.compile(r'value=["\'](m\d+|modulo-\d+)["\']')
    
    changed_lines = False
    for line in lines:
        m = mod_regex.search(line)
        if m:
            current_mod = m.group(1)
            
        if 'onComplete={handleModuleComplete}' in line:
            line = line.replace('onComplete={handleModuleComplete}', f'onComplete={{(score) => handleModuleComplete("{current_mod}", score)}}')
            changed_lines = True
        elif 'onComplete={handleQuizComplete}' in line:
            line = line.replace('onComplete={handleQuizComplete}', f'onComplete={{(score) => handleQuizComplete("{current_mod}", score)}}')
            changed_lines = True
            
        out_lines.append(line)
        
    if changed_lines:
        new_content = '\n'.join(out_lines)

    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        return True
    return False

def main():
    updated = 0
    for root, dirs, files in os.walk(AULAS_DIR):
        for f in files:
            if f.endswith(".tsx"):
                file_path = os.path.join(root, f)
                if fix_file(file_path):
                    updated += 1
                    print(f"Fixed TS in: {file_path}")
    print(f"Total updated: {updated}")

if __name__ == "__main__":
    main()
