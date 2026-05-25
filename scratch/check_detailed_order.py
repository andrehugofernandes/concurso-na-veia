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

    # Find the positions of the components in the text
    # We want to make sure that for each module:
    # 1. ModuleBanner
    # 2. ModuleSectionHeader index="INTRO"
    # 3. ContentAccordion mode="stacked"
    # 4. ModuleConsolidation
    # 5. QuizInterativo
    # Let's check how many ContentAccordion and ModuleConsolidation and QuizInterativo exist
    accordions = [m.start() for m in re.finditer(r'<ContentAccordion', content)]
    consolidations = [m.start() for m in re.finditer(r'<ModuleConsolidation', content)]
    quizzes = [m.start() for m in re.finditer(r'<QuizInterativo', content)]
    
    print(f"--- {f_name} ---")
    print(f"  Accordions: {len(accordions)}, Consolidations: {len(consolidations)}, Quizzes: {len(quizzes)}")
    
    # Check if there is any consolidation before accordion
    if len(consolidations) == 9 and len(accordions) == 9:
        wrongs = 0
        for i in range(9):
            if consolidations[i] < accordions[i]:
                wrongs += 1
        print(f"  Consolidations before Accordions: {wrongs}")
    elif len(consolidations) == 10 and len(accordions) == 10:
        wrongs = 0
        for i in range(10):
            if consolidations[i] < accordions[i]:
                wrongs += 1
        print(f"  Consolidations before Accordions: {wrongs}")
