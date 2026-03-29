import os
import re
import sys
from pathlib import Path
sys.path.insert(0, os.path.dirname(__file__))
from safeguard import safe_write, is_allowed_for_mass_edit

DRY_RUN = "--dry-run" in sys.argv

def upgrade_all_fonts():
    """
    Substitui tamanhos de fonte pequenos (xs, sm, base) por maiores (text-lg)
    em todos os arquivos de aula.
    """
    target_dir = Path("src/components/aulas")

    replacements = [
        (r'\btext-xs\b', 'text-lg'),
        (r'\btext-sm\b', 'text-lg'),
        (r'\btext-base\b', 'text-lg'),
    ]

    updated_files = 0

    for file_path in target_dir.rglob("Aula*.tsx"):
        str_path = str(file_path)
        if not is_allowed_for_mass_edit(str_path):
            continue

        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        new_content = content
        for pattern, repl in replacements:
            new_content = re.sub(pattern, repl, new_content)

        if new_content != content:
            safe_write(str_path, new_content, dry_run=DRY_RUN)
            updated_files += 1

    print(f"\n🚀 Finalizado! {updated_files} arquivos de aula padronizados com text-lg.")

if __name__ == "__main__":
    upgrade_all_fonts()
