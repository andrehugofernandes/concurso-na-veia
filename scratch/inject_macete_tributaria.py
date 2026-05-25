import re

filepath = r"c:\Workspace\petrobras-quest\src\components\aulas\administracao\AulaAdministracaoTributaria.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

def replace_consolidation(match):
    before = match.group(1)
    mod_num = match.group(2)
    after = match.group(3)
    
    if "maceteVisual=" in after:
        return match.group(0)
    
    macete = f"""        maceteVisual={{{{
          title: "O Pulo do Gato - Módulo {mod_num}",
          content: <p className="text-lg italic">"A prática leva à perfeição. Revise os conceitos principais e relacione com os processos do dia a dia da Petrobras."</p>
        }}}}"""
    
    return before + "index={" + mod_num + "}\n" + macete + after

pattern = r'(<ModuleConsolidation[^>]*?index=\{)(\d+)(\}.*?/>)'

new_content = re.sub(pattern, replace_consolidation, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Injected maceteVisual successfully.")
