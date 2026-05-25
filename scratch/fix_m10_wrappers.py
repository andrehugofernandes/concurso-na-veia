import os

files_to_fix = {
    "AulaLei13303.tsx": 'className="space-y-6 text-lg leading-relaxed text-foreground prose-invert"',
    "AulaRLCP.tsx": 'className="space-y-6 text-lg leading-relaxed text-foreground"',
    "AulaContabilidadeBasica.tsx": 'className="space-y-6 text-lg leading-relaxed text-foreground"',
    "AulaDireitoTributario.tsx": 'className="space-y-6 text-lg leading-relaxed text-foreground prose-invert"',
    "AulaAdministracaoTributaria.tsx": 'className="space-y-6 text-lg leading-relaxed text-foreground"'
}

dir_path = "src/components/aulas/administracao"
target_class = 'className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed"'

def fix_wrappers():
    for fn, old_class in files_to_fix.items():
        path = os.path.join(dir_path, fn)
        if not os.path.exists(path):
            print(f"[-] {fn}: não encontrado")
            continue
            
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            
        if old_class in content:
            new_content = content.replace(old_class, target_class)
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"[+] {fn}: wrapper da introdução do Módulo 10 padronizado!")
        else:
            # Tentar uma busca mais flexível
            # Por exemplo, sem aspas duplas rígidas se houver aspas simples
            old_class_single = old_class.replace('"', "'")
            if old_class_single in content:
                new_content = content.replace(old_class_single, target_class)
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"[+] {fn}: wrapper da introdução do Módulo 10 padronizado (com aspas simples)!")
            else:
                print(f"[~] {fn}: classe antiga '{old_class}' não encontrada no arquivo")

if __name__ == "__main__":
    fix_wrappers()
