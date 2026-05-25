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

def run_audit():
    print("INICIANDO AUDITORIA DAS AULAS...")
    for f_name in files:
        f_path = os.path.join(dir_path, f_name)
        if not os.path.exists(f_path):
            print(f"[-] {f_name}: Arquivo não encontrado")
            continue
            
        with open(f_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Verificar cores restritas no arquivo inteiro
        restricted_colors = []
        for color in ["violet", "purple", "fuchsia", "indigo"]:
            # Procurar ocorrências excluindo imports e caminhos de arquivo
            matches = re.findall(rf'\b{color}\b', content)
            # Ignorar o import de lucide ou react-icons e a definição do gradiente mock no banner se for o caso
            # Mas na verdade as regras de design banem violet e purple por completo
            if matches:
                restricted_colors.append(f"{color} ({len(matches)}x)")
                
        print(f"\n[AULA] {f_name}")
        if restricted_colors:
            print(f"  [AVISO] Cores restritas encontradas: {', '.join(restricted_colors)}")
            
        # Analisar os 10 módulos
        for m in range(1, 11):
            func_def = f"const renderModulo{m} = () => ("
            start_idx = content.find(func_def)
            is_helper = True
            
            if start_idx == -1:
                is_helper = False
                start_pat = rf'<TabsContent\s+value="modulo-{m}"[^>]*>'
                match_start = re.search(start_pat, content)
                if not match_start:
                    print(f"  [ERRO] Módulo {m}: Não encontrado no arquivo")
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
            
            # Verificar cabeçalho de introdução
            headers = re.findall(r'<ModuleSectionHeader\b([^>]*)>', block)
            if not headers:
                print(f"  [ERRO] Módulo {m}: Nenhum ModuleSectionHeader encontrado")
            else:
                # O primeiro header deve ser index="INTRO"
                first_header = headers[0]
                idx_m = re.search(r'index=["\']?(\w+)["\']?', first_header)
                idx_val = idx_m.group(1) if idx_m else None
                if not idx_val:
                    idx_braces = re.search(r'index=\{(\d+)\}', first_header)
                    if idx_braces:
                        idx_val = idx_braces.group(1)
                
                if idx_val != "INTRO":
                    print(f"  [ERRO] Módulo {m}: Primeiro ModuleSectionHeader tem index='{idx_val}' em vez de 'INTRO'")
            
            # Verificar contagem de parágrafos na introdução
            # Achar a div após o primeiro cabeçalho
            search_start = block.find("<ModuleSectionHeader")
            p_count = 0
            div_class = "N/A"
            if search_start != -1:
                div_start_idx = block.find("<div", search_start)
                if div_start_idx != -1:
                    class_match = re.search(r'className=["\']([^"\']+)["\']', block[div_start_idx:div_start_idx+150])
                    if class_match:
                        div_class = class_match.group(1)
                    
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
                    
            if p_count != 10:
                print(f"  [ERRO] Módulo {m}: Introdução tem {p_count} parágrafos em vez de 10")
                
            expected_class = "space-y-6 text-lg text-justify text-foreground/85 leading-relaxed"
            if div_class != expected_class:
                print(f"  [ERRO] Módulo {m}: Div de introdução tem classe '{div_class}' em vez de '{expected_class}'")
                
            # Verificar Accordion
            acc_match = re.search(r'<ContentAccordion\b([^>]*)>', block, re.DOTALL)
            if acc_match:
                acc_props = acc_match.group(1)
                if 'mode="stacked"' not in acc_props and "mode='stacked'" not in acc_props:
                    print(f"  [ERRO] Módulo {m}: ContentAccordion não está em mode='stacked'")
                # Verificar fontes pequenas no acordeon
                # Pegar o bloco do acordeon
                acc_start = block.find("<ContentAccordion")
                acc_end = block.find("/>", acc_start) + 2
                acc_content = block[acc_start:acc_end]
                for font_sz in ["text-sm", "text-xs", "text-xxs"]:
                    if font_sz in acc_content:
                        # Mas atenção: alguns links ou fontes de rodapé pequenas são permitidas fora do corpo? 
                        # A regra diz: "É estritamente proibido utilizar text-sm, text-xs ou text-xxs no corpo de texto dos itens do acordeon."
                        # Vamos avisar
                        print(f"  [AVISO] Módulo {m}: Encontrado '{font_sz}' no acordeon")
            elif m != 10:  # Módulo 10 é simulado, pode não ter acordeon
                print(f"  [AVISO] Módulo {m}: Nenhum ContentAccordion encontrado")
                
            # Verificar ordem dos componentes
            components = []
            for tag in ["<ModuleBanner", "<ModuleSectionHeader", "<ContentAccordion", "<FlipCard", "<ModuleConsolidation", "<QuizInterativo"]:
                pos = block.find(tag)
                if pos != -1:
                    start_pos = 0
                    while True:
                        idx = block.find(tag, start_pos)
                        if idx == -1:
                            break
                        components.append((idx, tag))
                        start_pos = idx + len(tag)
            components.sort(key=lambda x: x[0])
            tags_seq = [c[1] for c in components]
            
            # Verificar se Consolidação vem antes do Quiz
            if "<ModuleConsolidation" in tags_seq and "<QuizInterativo" in tags_seq:
                idx_cons = tags_seq.index("<ModuleConsolidation")
                idx_quiz = tags_seq.index("<QuizInterativo")
                if idx_cons > idx_quiz:
                    print(f"  [ERRO] Módulo {m}: ModuleConsolidation está posicionado DEPOIS do QuizInterativo")
                    
            # Verificar se tem FlipCard ou FlipCards
            # O fluxo diz: ... Accordion -> Exemplos/Fixação -> FlipCards -> Consolidação -> Quiz
            # Se tiver FlipCard, ver se vem antes de Consolidação
            if "<FlipCard" in tags_seq and "<ModuleConsolidation" in tags_seq:
                idx_flip = tags_seq.index("<FlipCard")
                idx_cons = tags_seq.index("<ModuleConsolidation")
                if idx_flip > idx_cons:
                    print(f"  [ERRO] Módulo {m}: FlipCard está posicionado DEPOIS do ModuleConsolidation")

if __name__ == "__main__":
    run_audit()
