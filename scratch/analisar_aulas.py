import os
import re

def analisar_aulas():
    dir_path = "src/components/aulas/administracao"
    if not os.path.exists(dir_path):
        print(f"Diretório não encontrado: {dir_path}")
        return
        
    files = [f for f in os.listdir(dir_path) if f.endswith(".tsx")]
    
    print("=" * 80)
    print(f"{'AULA':<45} | {'LINHAS':<6} | {'CONDICIONAL':<11} | {'CORES RESTRITAS'}")
    print("=" * 80)
    
    for file_name in files:
        file_path = os.path.join(dir_path, file_name)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # 1. Verifica renderização condicional de abas
        # Procura por activeTab === "modulo-N" ou similar
        has_conditional = bool(
            re.search(r'activeTab\s*===\s*["\']modulo-\d+["\']', content) or 
            re.search(r'activeTab\s*===\s*["\'][a-zA-Z0-9_-]+["\']\s*&&\s*\(', content)
        )
        
        # 2. Verifica cores restritas (violet, purple, fuchsia)
        restricted_colors = []
        for color in ["violet", "purple", "fuchsia"]:
            if re.search(r"\b" + color + r"\b", content):
                restricted_colors.append(color)
                
        # 3. Contagem de linhas
        lines = content.count("\n") + 1
        
        color_str = ", ".join(restricted_colors) if restricted_colors else "NENHUMA"
        cond_str = "SIM (OK)" if has_conditional else "NÃO (DOM INFL.)"
        
        print(f"{file_name:<45} | {lines:<6} | {cond_str:<11} | {color_str}")
        
    print("=" * 80)

if __name__ == "__main__":
    analisar_aulas()
