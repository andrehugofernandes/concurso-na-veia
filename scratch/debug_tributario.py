import re
import os

filepath = "src/components/aulas/administracao/AulaAdministrativoTributario.tsx"
content = open(filepath, "r", encoding="utf-8").read()

def find_balanced_block(content, start_pos, start_tag, end_tag):
    first_open = content.find(start_tag, start_pos)
    if first_open == -1:
        return -1, -1
    stack = 0
    curr = first_open
    while curr < len(content):
        if content[curr:curr+len(start_tag)] == start_tag and (curr+len(start_tag) == len(content) or not content[curr+len(start_tag)].isalnum()):
            stack += 1
            curr += len(start_tag)
        elif content[curr:curr+len(end_tag)] == end_tag:
            stack -= 1
            curr += len(end_tag)
            if stack == 0:
                return first_open, curr
        else:
            curr += 1
    return -1, -1

# Módulo 9
m = 9
start_pat = rf'<TabsContent\s+value="modulo-{m}"[^>]*>'
match_start = re.search(start_pat, content)
if match_start:
    start_pos = match_start.start()
    block_start, block_end = find_balanced_block(content, start_pos, "<TabsContent", "</TabsContent>")
    block = content[block_start:block_end]
    
    intro_header_pos = block.find('index="INTRO"')
    if intro_header_pos != -1:
        div_pos = block.find("<div", intro_header_pos)
        if div_pos != -1:
            div_start, div_end = find_balanced_block(block, div_pos, "<div", "</div>")
            div_block = block[div_start:div_end]
            
            idx_div = div_block.find("<div", 4)
            idx_alert = div_block.find("<AlertBox", 4)
            print(f"idx_div: {idx_div}")
            print(f"idx_alert: {idx_alert}")
            
            split_idx = -1
            if idx_div != -1 and idx_alert != -1:
                split_idx = min(idx_div, idx_alert)
            elif idx_div != -1:
                split_idx = idx_div
            elif idx_alert != -1:
                split_idx = idx_alert
                
            print(f"split_idx escolhido: {split_idx}")
            print("\n--- intro_p_text ---")
            print(div_block[:split_idx] if split_idx != -1 else div_block)
            print("\n--- box_content ---")
            print(div_block[split_idx:-6] if split_idx != -1 else "")
