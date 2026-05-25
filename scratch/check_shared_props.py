with open("src/components/aulas/shared.tsx", "r", encoding="utf-8") as f:
    content = f.read()

import re
match = re.search(r'export\s+function\s+ModuleConsolidation\((.*?)\)', content, re.DOTALL)
if match:
    print(match.group(1))
else:
    # Procura interface ModuleConsolidationProps
    match_interface = re.search(r'interface\s+ModuleConsolidationProps\s*\{(.*?)\}', content, re.DOTALL)
    if match_interface:
        print(match_interface.group(1))
    else:
        print("Não achou ModuleConsolidation em shared.tsx")
