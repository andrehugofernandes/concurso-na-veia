import os
import re
import sys
from pathlib import Path
sys.path.insert(0, os.path.dirname(__file__))
from safeguard import safe_write, is_allowed_for_mass_edit

DRY_RUN = "--dry-run" in sys.argv

def fix_intro_typography():
    """
    Aumenta o tamanho da fonte (text-base -> text-xl) e adiciona alinhamento justificado
    em seções de 'Rich Intro' nas aulas.
    """
    target_dir = Path("src/components/aulas")

    pattern = r'(className=["\']space-y-6\s+text-(?:base|xl)\s+text-foreground/85\s+leading-relaxed)(["\'])'
    replacement = r'className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify"'

    updated_files = 0
    total_matches = 0

    for file_path in target_dir.rglob("Aula*.tsx"):
        str_path = str(file_path)
        if not is_allowed_for_mass_edit(str_path):
            continue

        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        new_content = re.sub(pattern, replacement, content)

        if new_content != content:
            safe_write(str_path, new_content, dry_run=DRY_RUN)
            updated_files += 1
            matches = len(re.findall(pattern, content))
            total_matches += matches

    print(f"\n🚀 Finalizado! {updated_files} arquivos atualizados, {total_matches} seções ajustadas.")

if __name__ == "__main__":
    fix_intro_typography()
