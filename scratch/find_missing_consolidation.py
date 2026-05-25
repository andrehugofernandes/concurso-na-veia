import os
import re

files = [
    "AulaGestaoQualidadeSuprimento.tsx",
    "AulaLogisticaSuprimento.tsx",
    "AulaComprasSuprimento.tsx",
    "AulaLei13303.tsx"
]

dir_path = "src/components/aulas/administracao"

for f_name in files:
    f_path = os.path.join(dir_path, f_name)
    with open(f_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Vamos achar quais TabsContent value="modulo-N" contem ModuleConsolidation
    tabs = re.findall(r'<TabsContent value="modulo-(\d+)"[^>]*>(.*?)</TabsContent>', content, re.DOTALL)
    print(f"--- {f_name} ---")
    for tab_num, tab_content in tabs:
        has_consolidation = "<ModuleConsolidation" in tab_content
        has_quiz = "<QuizInterativo" in tab_content
        print(f"  Módulo {tab_num}: Consolidation={has_consolidation}, Quiz={has_quiz}")
