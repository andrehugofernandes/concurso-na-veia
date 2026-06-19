import os
import glob
import re

def escape_jsx(text):
    if not text: return ""
    text = text.replace('{', '&#123;').replace('}', '&#125;')
    return text.replace('"', '&quot;')

def extract_first_question_from_data(data_content, quiz_var=None):
    content_inside = data_content
    if quiz_var:
        alias_pattern = r'const\s+' + re.escape(quiz_var) + r'\s*=\s*([A-Za-z0-9_]+);'
        alias_match = re.search(alias_pattern, data_content)
        if alias_match:
            quiz_var = alias_match.group(1)
            
        array_pattern = r'const\s+' + re.escape(quiz_var) + r'[^\[]*\[(.*?)\];'
        array_match = re.search(array_pattern, data_content, re.DOTALL)
        if array_match:
            content_inside = array_match.group(1)

    # Split by '{' to find blocks
    blocks = content_inside.split('id:')
    if len(blocks) < 2: return None
    
    first_block = blocks[1]
    
    # Very safe regex without backtracking
    perg_match = re.search(r'(?:pergunta|enunciado):\s*(?:"([^"]+)"|\'([^\']+)\'|`([^`]+)`|<>\s*([^<]+)\s*</>)', first_block, re.DOTALL)
    corr_match = re.search(r'correta:\s*["\']([^"\']+)["\']', first_block)
    expl_match = re.search(r'explicacao:\s*(?:"([^"]+)"|\'([^\']+)\'|`([^`]+)`)', first_block, re.DOTALL)
    
    if not perg_match or not corr_match or not expl_match:
        return None
        
    pergunta = perg_match.group(1) or perg_match.group(2) or perg_match.group(3) or perg_match.group(4)
    correta = corr_match.group(1)
    explicacao = expl_match.group(1) or expl_match.group(2) or expl_match.group(3)
    
    # parse opcoes safely
    opcoes = []
    # find the array inside `opcoes: [...]`
    opc_block_match = re.search(r'opcoes:\s*\[(.*?)\]', first_block, re.DOTALL)
    if opc_block_match:
        for opt in re.finditer(r'label:\s*["\']([^"\']+)["\'].*?valor:\s*["\']([^"\']+)["\']', opc_block_match.group(1), re.DOTALL):
            opcoes.append(f'{{ label: "{opt.group(1)}", valor: "{escape_jsx(opt.group(2))}" }}')
            
    if not opcoes: return None
        
    parts = re.split(r'(?<=[.!?])\s+', explicacao)
    passo1 = escape_jsx(parts[0] if len(parts) > 0 else explicacao)
    passo2 = escape_jsx(" ".join(parts[1:2]) if len(parts) > 1 else "")
    passo3 = escape_jsx(" ".join(parts[2:]) if len(parts) > 2 else "Gabarito confirmado.")
    
    if not passo2: passo2 = "Análise da alternativa correta com base no contexto."
    if not passo3: passo3 = "Gabarito confirmado."
    
    return {
        "pergunta": escape_jsx(pergunta),
        "opcoes": opcoes,
        "correta": correta,
        "passo1": passo1,
        "passo2": passo2,
        "passo3": passo3
    }

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    if '<QuestaoResolvidaStepByStep' not in content:
        if 'QuestaoResolvidaStepByStep' not in content:
            content = re.sub(r'(import \{[^}]*?)(QuizInterativo)([^}]*?\} from "../shared";)', r'\1\2, QuestaoResolvidaStepByStep\3', content)
            
    data_content = content
    data_match = re.search(r'import\s+\{[^}]*\}\s+from\s+["\'](\./data/[^"\']+)["\'];', content)
    if data_match:
        data_import_path = data_match.group(1)
        dir_name = os.path.dirname(filepath)
        data_file = os.path.join(dir_name, data_import_path + ".ts")
        if os.path.exists(data_file):
            with open(data_file, "r", encoding="utf-8") as f:
                data_content += "\n" + f.read()

    changed = False
    
    for i in range(1, 11):
        mod_pattern = r'(<TabsContent\s+value=["\'](?:modulo-)?' + str(i) + r'["\'][^>]*>.*?)((?:</TabsContent>|<TabsContent))'
        
        def repl(match):
            nonlocal changed
            mod_text = match.group(1)
            next_mod = match.group(2)
            
            if '<QuestaoResolvidaStepByStep' in mod_text:
                return mod_text + next_mod
                
            quiz_match = re.search(r'<QuizInterativo[^>]*questoes=\{(.*?)\}', mod_text, re.DOTALL)
            if not quiz_match:
                return mod_text + next_mod
                
            inner = quiz_match.group(1)
            var_match = re.search(r'(?i)(quiz[A-Za-z0-9_]+)', inner)
            if not var_match:
                var_match = re.search(r'([A-Z_][A-Z0-9_]+)', inner)
            if not var_match:
                var_match = re.search(r'([A-Za-z0-9_]+)', inner)
                
            quiz_var = var_match.group(1) if var_match else None
            
            if quiz_var:
                state_match = re.search(r'const\s+\[\s*' + re.escape(quiz_var) + r'\s*,\s*.*?\]\s*=\s*useState\s*\(\s*([A-Za-z0-9_]+)\s*\)', content)
                if state_match:
                    quiz_var = state_match.group(1)
            
            q_data = extract_first_question_from_data(data_content, quiz_var)
            if not q_data:
                q_data = extract_first_question_from_data(data_content, None)
                
            if not q_data:
                return mod_text + next_mod
                
            opcoes_jsx = ",\n                ".join(q_data['opcoes'])
            
            jsx = f"""<QuestaoResolvidaStepByStep
              materia="resolucao"
              enunciado="{q_data['pergunta']}"
              alternativas={[
                {opcoes_jsx}
              ]}
              correta="{q_data['correta']}"
              passos={[
                "{q_data['passo1']}",
                "{q_data['passo2']}",
                "{q_data['passo3']}"
              ]}
            />\n        """
            
            new_mod_text = re.sub(r'(<QuizInterativo)', jsx + r'\1', mod_text, count=1)
            changed = True
            return new_mod_text + next_mod
            
        content = re.sub(mod_pattern, repl, content, flags=re.DOTALL)
        
    if changed:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

def main():
    folders = ["matematica", "portugues"]
    count = 0
    for folder in folders:
        files = glob.glob(f"src/components/aulas/{folder}/*.tsx")
        for f in files:
            if process_file(f):
                print(f"Modificado: {f}")
                count += 1
    print(f"Total modificados: {count}")

main()
