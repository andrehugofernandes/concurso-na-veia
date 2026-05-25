import os

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
    
    # Substituir a duplicação
    old_class = 'text-foreground/85 leading-relaxed text-foreground/85 leading-relaxed'
    new_class = 'text-foreground/85 leading-relaxed'
    
    content = content.replace(old_class, new_class)
    
    with open(f_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Corrigidas classes duplicadas em {f_name}")
