import re

filepath = r"src/components/aulas/administracao/AulaComprasSuprimento.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Let's find renderModulo1 to renderModulo10
for i in range(1, 11):
    func_def = f"const renderModulo{i} = () => ("
    start_idx = content.find(func_def)
    if start_idx == -1:
        continue
    
    # Encontrar o fechamento da função ou o início da próxima
    end_idx = content.find("const renderModulo", start_idx + 10)
    if end_idx == -1:
        end_idx = content.find("return (", start_idx)
        
    block = content[start_idx:end_idx]
    
    # Procurar ModuleConsolidation
    consol_match = re.search(r'(<ModuleConsolidation\b.*?/>)', block, re.DOTALL)
    quiz_match = re.search(r'(<QuizInterativo\b.*?/>)', block, re.DOTALL)
    
    if consol_match and quiz_match:
        consol_str = consol_match.group(1)
        # Remover a consolidação do bloco
        block_clean = block.replace(consol_str, "")
        
        # Achar a posição do QuizInterativo na string limpa
        quiz_match_clean = re.search(r'(<QuizInterativo\b.*?/>)', block_clean, re.DOTALL)
        if quiz_match_clean:
            quiz_str = quiz_match_clean.group(1)
            # Inserir a consolidação logo antes do quiz com a identação correta
            new_quiz_str = consol_str + "\n\n      " + quiz_str
            block_new = block_clean.replace(quiz_str, new_quiz_str)
            content = content.replace(block, block_new)
            print(f"Módulo {i} reordenado com sucesso!")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
