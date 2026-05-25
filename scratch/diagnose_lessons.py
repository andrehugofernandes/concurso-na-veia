import os
import re

files = [
    "AulaGestaoQualidadeSuprimento.tsx",
    "AulaLogisticaSuprimento.tsx",
    "AulaComprasSuprimento.tsx",
    "AulaLei13303.tsx",
    "AulaRLCP.tsx",
    "AulaAdministrativoTributario.tsx",
    "AulaContabilidadeBasica.tsx",
    "AulaDireitoTributario.tsx",
    "AulaAdministracaoTributaria.tsx"
]

dir_path = "src/components/aulas/administracao"

def run_diagnose():
    print("=" * 100)
    print(f"{'ARQUIVO':<35} | MÓDULO | INTRO HDR | PARÁGRAFOS | CLASSE CONTAINER | ACCORDION MODE | ORDEM COMPONENTES")
    print("=" * 100)
    
    for f_name in files:
        f_path = os.path.join(dir_path, f_name)
        if not os.path.exists(f_path):
            print(f"{f_name:<35} | Não encontrado")
            continue
            
        with open(f_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Vamos rodar por cada módulo (1 a 10)
        for m in range(1, 11):
            # Achar o bloco do módulo (helper ou inline)
            func_def = f"const renderModulo{m} = () => ("
            start_idx = content.find(func_def)
            is_helper = True
            
            if start_idx == -1:
                is_helper = False
                start_pat = rf'<TabsContent\s+value="modulo-{m}"[^>]*>'
                match_start = re.search(start_pat, content)
                if not match_start:
                    print(f"{f_name:<35} | M{m:<5} | NÃO ENCONTRADO NO ARQUIVO")
                    continue
                start_idx = match_start.start()
                if m < 10:
                    next_pat = rf'<TabsContent\s+value="modulo-{m+1}"[^>]*>'
                    match_next = re.search(next_pat, content)
                    if match_next:
                        end_idx = match_next.start()
                    else:
                        end_idx = content.find("</Tabs>", start_idx)
                else:
                    end_idx = content.find("</Tabs>", start_idx)
            else:
                end_idx = content.find("const renderModulo", start_idx + 10)
                if end_idx == -1:
                    end_idx = content.find("return (", start_idx)
            
            block = content[start_idx:end_idx]
            
            # 1. Encontrar o primeiro ModuleSectionHeader no bloco
            header_match = re.search(r'<ModuleSectionHeader\b([^>]*)>', block, re.DOTALL)
            header_idx = "N/A"
            if header_match:
                header_props = header_match.group(1)
                idx_m = re.search(r'index=["\']?(\w+)["\']?', header_props)
                if idx_m:
                    header_idx = idx_m.group(1)
                else:
                    idx_braces = re.search(r'index=\{(\d+)\}', header_props)
                    if idx_braces:
                        header_idx = idx_braces.group(1)
            
            # 2. Encontrar o container da introdução (div com className)
            # Pode estar logo após o ModuleSectionHeader
            div_match = re.search(r'<div\s+className=["\']([^"\']+)["\']>\s*(<p>.*?</p>)+', block, re.DOTALL)
            div_class = "N/A"
            p_count = 0
            if div_match:
                # O regex pode ser simplificado: procurar por div com space-y e depois pegar os <p> dentro dela
                # Vamos achar o index de INTRO ou do Header e olhar o primeiro <div... que venha depois dele
                pass
            
            # Abordagem alternativa: procurar a primeira div depois do cabeçalho
            search_start = block.find("<ModuleSectionHeader")
            if search_start != -1:
                div_start_idx = block.find("<div", search_start)
                if div_start_idx != -1:
                    class_match = re.search(r'className=["\']([^"\']+)["\']', block[div_start_idx:div_start_idx+150])
                    if class_match:
                        div_class = class_match.group(1)
                    
                    # Contar <p> até a próxima tag de fechamento ou componente irmão
                    # Vamos encontrar o fechamento desta div específica de parágrafos.
                    # Mas para simplificar, vamos contar tags <p> no trecho entre esta div e o próximo componente didático (ContentAccordion ou outro)
                    next_sibling = min([
                        x for x in [
                            block.find("<ContentAccordion", div_start_idx),
                            block.find("<ModuleConsolidation", div_start_idx),
                            block.find("<QuizInterativo", div_start_idx),
                            block.find("</section>", div_start_idx),
                            len(block)
                        ] if x != -1
                    ])
                    div_content = block[div_start_idx:next_sibling]
                    p_tags = re.findall(r'<p\b[^>]*>.*?</p>', div_content, re.DOTALL)
                    p_count = len(p_tags)
            
            # 3. Encontrar o Accordion e seu modo
            acc_match = re.search(r'<ContentAccordion\b([^>]*)>', block, re.DOTALL)
            acc_mode = "N/A"
            if acc_match:
                acc_props = acc_match.group(1)
                mode_m = re.search(r'mode=["\']([^"\']+)["\']', acc_props)
                if mode_m:
                    acc_mode = mode_m.group(1)
                else:
                    acc_mode = "default (NOT STACKED)"
            
            # 4. Sequência de componentes no bloco
            components_found = []
            for tag in ["<ModuleBanner", "<ModuleSectionHeader", "<ContentAccordion", "<FlipCard", "<ModuleConsolidation", "<QuizInterativo"]:
                pos = block.find(tag)
                if pos != -1:
                    # Encontrar todas as ocorrências para ver a sequência
                    start_pos = 0
                    while True:
                        idx = block.find(tag, start_pos)
                        if idx == -1:
                            break
                        components_found.append((idx, tag))
                        start_pos = idx + len(tag)
            
            components_found.sort(key=lambda x: x[0])
            seq_str = " -> ".join([c[1][1:] for c in components_found])
            
            print(f"{f_name:<35} | M{m:<5} | {header_idx:<9} | {p_count:<10} | {div_class:<25} | {acc_mode:<14} | {seq_str}")
            
    print("=" * 100)

if __name__ == "__main__":
    run_diagnose()
