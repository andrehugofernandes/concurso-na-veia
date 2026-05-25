import os

files_to_fix = [
    "AulaComprasSuprimento.tsx",
    "AulaRLCP.tsx",
    "AulaAdministrativoTributario.tsx",
    "AulaDireitoTributario.tsx"
]

dir_path = "src/components/aulas/administracao"

def fix_colors():
    for fn in files_to_fix:
        path = os.path.join(dir_path, fn)
        if not os.path.exists(path):
            print(f"[-] {fn}: não encontrado")
            continue
            
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            
        original_content = content
        
        # 1. Ajuste de variants se houver a definição clássica
        # const variants = ["indigo", ... "violet"]
        content = content.replace('"indigo", "emerald", "amber", "rose", "violet"', '"cyan", "emerald", "amber", "rose", "teal"')
        content = content.replace("'indigo', 'emerald', 'amber', 'rose', 'violet'", "'cyan', 'emerald', 'amber', 'rose', 'teal'")
        
        # 2. Substituições pontuais específicas dos arquivos
        # AulaComprasSuprimento
        content = content.replace("dark:text-indigo-400", "dark:text-cyan-400")
        content = content.replace("dark:text-violet-400", "dark:text-teal-400")
        
        # AulaRLCP
        content = content.replace('placeholderColor: "indigo"', 'placeholderColor: "cyan"')
        content = content.replace("placeholderColor: 'indigo'", "placeholderColor: 'cyan'")
        
        # AulaAdministrativoTributario
        content = content.replace("from-violet-50 to-purple-50", "from-teal-50 to-blue-50")
        content = content.replace("border-violet-200 dark:border-violet-800", "border-teal-200 dark:border-teal-800")
        content = content.replace("dark:bg-violet-900/40", "dark:bg-teal-900/40")
        content = content.replace("dark:text-violet-300", "dark:text-teal-300")
        content = content.replace("dark:text-violet-400", "dark:text-teal-400")
        content = content.replace("to-indigo-50", "to-cyan-50")
        
        # AulaDireitoTributario
        content = content.replace("bg-indigo-100 dark:bg-indigo-900/30", "bg-cyan-100 dark:bg-cyan-900/30")
        content = content.replace("dark:bg-violet-900/30", "dark:bg-teal-900/30")
        
        if content != original_content:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"[+] {fn}: cores restritas substituídas com sucesso!")
        else:
            print(f"[~] {fn}: nenhuma substituição necessária")

if __name__ == "__main__":
    fix_colors()
