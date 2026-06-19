# -*- coding: utf-8 -*-
import os
import re
import shutil

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
AULAS_DIR = os.path.join(BASE_DIR, "src", "components", "aulas")
PUBLIC_IMG_DIR = os.path.join(BASE_DIR, "public")

def run_migration():
    tsx_files = []
    for root, dirs, files in os.walk(AULAS_DIR):
        for f in files:
            if f.endswith(".tsx"):
                tsx_files.append(os.path.join(root, f))
    
    # Matches src="/assets/images/materia/aula/..."
    regex_img = re.compile(r'(?:src|url)=["\'](/assets/images/([^/]+)/([^/]+)/(.+?))["\']')
    
    moved_count = 0
    updated_files = 0

    for file_path in tsx_files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        new_content = content
        matches = regex_img.findall(content)
        has_changes = False
        
        for full_path, materia, aula, rest_path in matches:
            parts = rest_path.split("/")
            filename = parts[-1]
            
            mod_num = None
            
            # Verifica se já está numa pasta modulo-X
            if len(parts) > 1 and parts[-2].startswith("modulo-"):
                mod_num = parts[-2].replace("modulo-", "")
            
            # Verifica se o arquivo tem um prefixo
            prefix_match = re.search(r'^(?:m|mod)ulo?[-_]?(\d+)[-_](.+)$', filename, re.IGNORECASE)
            if not prefix_match:
                prefix_match = re.search(r'^m(\d+)[-_](.+)$', filename, re.IGNORECASE)
                
            generic_name = filename
            if prefix_match:
                if not mod_num:
                    mod_num = prefix_match.group(1)
                generic_name = prefix_match.group(2)
            
            if not mod_num:
                continue
                
            new_relative = f"/assets/images/{materia}/{aula}/modulo-{mod_num}/{generic_name}"
            
            if new_relative != full_path:
                old_physical = os.path.join(PUBLIC_IMG_DIR, full_path.lstrip("/"))
                new_physical = os.path.join(PUBLIC_IMG_DIR, new_relative.lstrip("/"))
                
                os.makedirs(os.path.dirname(new_physical), exist_ok=True)
                
                if os.path.exists(old_physical):
                    try:
                        shutil.move(old_physical, new_physical)
                        moved_count += 1
                        print(f"MOVIDO: {full_path} -> {new_relative}")
                    except Exception as e:
                        pass
                
                new_content = new_content.replace(full_path, new_relative)
                has_changes = True

        if has_changes:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            updated_files += 1

    print(f"\n--- Resumo ---")
    print(f"Imagens movidas: {moved_count}")
    print(f"Arquivos TSX atualizados: {updated_files}")

if __name__ == "__main__":
    run_migration()
