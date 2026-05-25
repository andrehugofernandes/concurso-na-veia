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

print("=" * 80)
print(f"{'ARQUIVO':<35} | {'Nº MÓDULOS':<10} | {'MÓDULOS'}")
print("=" * 80)

for f_name in files:
    f_path = os.path.join(dir_path, f_name)
    if not os.path.exists(f_path):
        print(f"{f_name:<35} | Não existe")
        continue
    with open(f_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Procura por MODULE_DEFS = [ ... ]
    match = re.search(r'MODULE_DEFS\s*=\s*\[(.*?)\]', content, re.DOTALL)
    if match:
        defs_text = match.group(1)
        # Contar itens
        items = re.findall(r'\{\s*(?:id|label|title)[^}]*\}', defs_text)
        titles = re.findall(r'title:\s*["\'](.*?)["\']', defs_text)
        print(f"{f_name:<35} | {len(items):<10} | {', '.join(titles)}")
    else:
        # Tenta outra regex
        match_arr = re.search(r'const\s+modules\s*=\s*\[(.*?)\]', content, re.DOTALL)
        if match_arr:
            defs_text = match_arr.group(1)
            items = re.findall(r'\{\s*(?:id|label|title)[^}]*\}', defs_text)
            titles = re.findall(r'title:\s*["\'](.*?)["\']', defs_text)
            print(f"{f_name:<35} | {len(items):<10} | {', '.join(titles)}")
        else:
            print(f"{f_name:<35} | Não achou   | N/A")

print("=" * 80)
