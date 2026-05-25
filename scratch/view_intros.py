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

    # Encontrar ocorrências de index="INTRO" e pegar a div seguinte
    matches = list(re.finditer(r'index=["\']INTRO["\']', content))
    p_counts = []
    
    for match in matches:
        start_pos = match.start()
        # Achar a próxima tag div
        div_start = content.find("<div", start_pos)
        if div_start == -1:
            continue
        # Achar o fechamento correspondente da div
        # Para simplificar, vamos pegar os p's até a próxima section ou Quiz ou ModuleConsolidation
        next_section = content.find("</section>", div_start)
        if next_section == -1:
            next_section = content.find("<ModuleConsolidation", div_start)
            
        block = content[div_start:next_section]
        p_tags = re.findall(r'<p>.*?</p>|<p\b[^>]*>.*?</p>', block, re.DOTALL)
        p_counts.append(len(p_tags))
        
    print(f"{f_name:<35} | Modulos com intro: {len(p_counts)} | Parágrafos por modulo: {p_counts}")
