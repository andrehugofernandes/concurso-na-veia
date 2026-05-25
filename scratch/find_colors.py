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

colors_to_find = ["violet", "purple", "fuchsia", "indigo"]

for f_name in files:
    f_path = os.path.join(dir_path, f_name)
    if not os.path.exists(f_path):
        continue
    with open(f_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    found = []
    for color in colors_to_find:
        matches = re.findall(r'[\w-]*-?' + color + r'-?[\w-]*', content)
        if matches:
            found.extend(matches)
            
    if found:
        print(f"{f_name:<35} | {set(found)}")
