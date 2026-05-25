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

    # Contar as ocorrências de ModuleSectionHeader no arquivo
    headers = re.findall(r'<ModuleSectionHeader[^>]*>', content)
    intros = re.findall(r'index=["\']INTRO["\']', content)
    
    print(f"{f_name:<35} | Total Section Headers: {len(headers)} | INTRO headers: {len(intros)}")
