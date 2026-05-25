import re
import os

filepath = "src/components/aulas/administracao/AulaAdministrativoTributario.tsx"
# Dar checkout antes de rodar
os.system(f"git checkout -- {filepath}")

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
            
            split_idx = -1
            if idx_div != -1 and idx_alert != -1:
                split_idx = min(idx_div, idx_alert)
            elif idx_div != -1:
                split_idx = idx_div
            elif idx_alert != -1:
                split_idx = idx_alert
                
            print(f"split_idx: {split_idx}")
            intro_p_text = div_block[:split_idx] if split_idx != -1 else div_block
            box_content = div_block[split_idx:-6] if split_idx != -1 else ""
            
            # Limpar e preparar os 10 parágrafos C.E.D.E.A
            p_tags = re.findall(r'<p\b[^>]*>.*?</p>', intro_p_text, re.DOTALL)
            print(f"p_tags detectados: {len(p_tags)}")
            
            # Simular a substituição e salvar
            p1 = "<strong>[Contexto]</strong> P1"
            p2 = "<strong>[Contexto]</strong> P2"
            p3 = "<strong>[Explicação]</strong> P3"
            p4 = "<strong>[Explicação]</strong> P4"
            p5 = "<strong>[Demonstração]</strong> P5"
            p6 = "<strong>[Demonstração]</strong> P6"
            p7 = "<strong>[Expansão]</strong> P7"
            p8 = "<strong>[Expansão]</strong> P8"
            p9 = "<strong>[Aplicação]</strong> P9"
            p10 = "<strong>[Aplicação]</strong> P10"
            
            new_div_content = f"""<div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>{p1}</p>
            <p>{p2}</p>
            <p>{p3}</p>
            <p>{p4}</p>
            <p>{p5}</p>
            <p>{p6}</p>
            <p>{p7}</p>
            <p>{p8}</p>
            <p>{p9}</p>
            <p>{p10}</p>
            {box_content}
          </div>"""
            
            block_new = block.replace(div_block, new_div_content)
            print("--- NOVA DIV MONTADA (primeiros 400 chars) ---")
            print(new_div_content[:400])
            print("--- NOVA DIV MONTADA (últimos 400 chars) ---")
            print(new_div_content[-400:])
            
            new_content = content.replace(block, block_new)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            
            print("\nArquivo salvo. Vamos ler as linhas 890 a 905 do arquivo salvo:")
            lines = open(filepath, "r", encoding="utf-8").readlines()
            for i in range(885, 905):
                if i < len(lines):
                    print(f"{i+1}: {lines[i]}", end="")
