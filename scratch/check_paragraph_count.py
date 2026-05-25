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
    
    # Encontrar as seções de Introdução (INTRO)
    # Procurar por ModuleSectionHeader index="INTRO" ou index={1..10} e a div seguinte
    intro_blocks = re.findall(r'<ModuleSectionHeader[^>]*index=["\']INTRO["\'][^>]*>.*?(<div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">.*?</div>)', content, re.DOTALL)
    
    # Se não achar com text-lg, tentar com o antigo text-base (já refatorado, então deve ser text-lg)
    p_counts = []
    for block in intro_blocks:
        p_tags = re.findall(r'<p>.*?</p>', block, re.DOTALL)
        p_counts.append(len(p_tags))
        
    print(f"{f_name:<35} | Parágrafos por intro: {p_counts}")
