import glob
import re

def main():
    folders = ["administracao", "matematica", "portugues"]
    for folder in folders:
        files = glob.glob(f"src/components/aulas/{folder}/*.tsx")
        total_files = len(files)
        success_files = 0
        
        print(f"\n--- Auditoria {folder.upper()} ---")
        for f in files:
            with open(f, "r", encoding="utf-8") as file:
                content = file.read()
                
            missing = []
            
            for i in range(1, 11):
                mod_pattern = r'<TabsContent\s+value=["\'](?:modulo-)?' + str(i) + r'["\'][^>]*>.*?(?:</TabsContent>|<TabsContent)'
                mod_match = re.search(mod_pattern, content, re.DOTALL)
                
                if mod_match:
                    mod_text = mod_match.group(0)
                    if '<QuizInterativo' in mod_text and '<QuestaoResolvidaStepByStep' not in mod_text:
                        missing.append(i)
                        
            if not missing:
                success_files += 1
            else:
                print(f"[FALHA] {f.split('/')[-1]}: Faltam passo-a-passo nos módulos {missing}")
                
        print(f"Total: {success_files}/{total_files} aulas com 100% dos módulos injetados.")

main()
