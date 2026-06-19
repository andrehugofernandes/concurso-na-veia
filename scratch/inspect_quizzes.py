import os
import re

folders = [
    r"c:\Workspace\petrobras-quest\src\components\aulas\portugues",
    r"c:\Workspace\petrobras-quest\src\components\aulas\matematica",
    r"c:\Workspace\petrobras-quest\src\components\aulas\administracao"
]

for folder in folders:
    print(f"\n=== FOLDER: {folder} ===")
    if not os.path.exists(folder):
        print("Does not exist!")
        continue
    for file in os.listdir(folder):
        if file.endswith(".tsx"):
            filepath = os.path.join(folder, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find quiz imports
            quiz_imports = re.findall(r'import\s+\{([^}]+)\}\s+from\s+["\']([^"\']+)["\']', content)
            print(f"\nFile: {file}")
            for imp in quiz_imports:
                if "quiz" in imp[1].lower():
                    print(f"  Imports: {imp[0].strip()} from {imp[1]}")
                    
            # Let's see how many ModuleConsolidation are in this file
            consolidation_count = content.count("<ModuleConsolidation")
            step_by_step_count = content.count("<QuestaoResolvidaStepByStep")
            print(f"  ModuleConsolidations: {consolidation_count}, StepBySteps: {step_by_step_count}")
