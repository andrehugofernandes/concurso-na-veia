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

for f_name in files:
    f_path = os.path.join(dir_path, f_name)
    if not os.path.exists(f_path):
        continue
        
    with open(f_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    modified = False
    
    # Tentativa 1: Procurar pelas funções helper renderModuloX
    for i in range(1, 11):
        func_def = f"const renderModulo{i} = () => ("
        start_idx = content.find(func_def)
        if start_idx == -1:
            continue
            
        end_idx = content.find("const renderModulo", start_idx + 10)
        if end_idx == -1:
            end_idx = content.find("return (", start_idx)
            
        block = content[start_idx:end_idx]
        
        consol_match = re.search(r'(<ModuleConsolidation\b.*?/>)', block, re.DOTALL)
        quiz_match = re.search(r'(<QuizInterativo\b.*?/>)', block, re.DOTALL)
        
        if consol_match and quiz_match:
            consol_str = consol_match.group(1)
            # Apenas reordenar se a consolidação estiver antes de outra coisa (como o Accordion) e queremos colocá-la antes do Quiz
            # Se já estiver antes do Quiz, mas queremos limpar o posicionamento:
            # Vamos remover da posição atual e colocar imediatamente antes do quiz
            # Mas primeiro, vamos checar se a consolidação está antes do ContentAccordion
            accordion_match = re.search(r'<ContentAccordion', block)
            if accordion_match and block.find(consol_str) < accordion_match.start():
                block_clean = block.replace(consol_str, "")
                quiz_match_clean = re.search(r'(<QuizInterativo\b.*?/>)', block_clean, re.DOTALL)
                if quiz_match_clean:
                    quiz_str = quiz_match_clean.group(1)
                    new_quiz_str = consol_str + "\n\n      " + quiz_str
                    block_new = block_clean.replace(quiz_str, new_quiz_str)
                    content = content.replace(block, block_new)
                    modified = True
                    print(f"[{f_name}] Reordenado Módulo {i} (helper function)")
                    
    # Tentativa 2: Procurar por TabsContent inline
    if not modified:
        # Se for inline TabsContent
        for i in range(1, 11):
            pattern = rf'(<TabsContent\s+value="modulo-{i}"[^>]*>)(.*?)(</TabsContent>)'
            tabs_matches = list(re.finditer(pattern, content, re.DOTALL))
            for match in tabs_matches:
                header = match.group(1)
                body = match.group(2)
                footer = match.group(3)
                
                consol_match = re.search(r'(<ModuleConsolidation\b.*?/>)', body, re.DOTALL)
                quiz_match = re.search(r'(<QuizInterativo\b.*?/>)', body, re.DOTALL)
                
                if consol_match and quiz_match:
                    consol_str = consol_match.group(1)
                    accordion_match = re.search(r'<ContentAccordion', body)
                    if accordion_match and body.find(consol_str) < accordion_match.start():
                        body_clean = body.replace(consol_str, "")
                        quiz_match_clean = re.search(r'(<QuizInterativo\b.*?/>)', body_clean, re.DOTALL)
                        if quiz_match_clean:
                            quiz_str = quiz_match_clean.group(1)
                            new_quiz_str = consol_str + "\n\n          " + quiz_str
                            body_new = body_clean.replace(quiz_str, new_quiz_str)
                            full_old = match.group(0)
                            full_new = header + body_new + footer
                            content = content.replace(full_old, full_new)
                            modified = True
                            print(f"[{f_name}] Reordenado Módulo {i} (TabsContent inline)")

    if modified:
        with open(f_path, "w", encoding="utf-8") as f:
            f.write(content)
