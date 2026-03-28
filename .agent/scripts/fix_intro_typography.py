import os
import re
from pathlib import Path

def fix_intro_typography():
    """
    Aumenta o tamanho da fonte (text-base -> text-xl) e adiciona alinhamento justificado
    em seções de 'Rich Intro' nas aulas.
    """
    target_dir = Path("src/components/aulas")
    
    # Padrao que busca o div de conteudo rico das aulas
    # Suporta tanto text-base quanto text-xl (caso ja tenha sido alterado manualmente)
    # Suporta aspas simples ou duplas
    pattern = r'(className=["\']space-y-6\s+text-(?:base|xl)\s+text-foreground/85\s+leading-relaxed)(["\'])'
    
    # Substituicao: muda para text-xl e adiciona text-justify se nao houver
    replacement = r'className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify"'

    updated_files = 0
    total_matches = 0

    for file_path in target_dir.rglob("Aula*.tsx"):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Verifica se o padrao existe e se ja nao tem text-justify
        new_content = re.sub(pattern, replacement, content)
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            updated_files += 1
            # Contagem aproximada de matches no arquivo
            matches = len(re.findall(pattern, content))
            total_matches += matches
            print(f"✅ Atualizado: {file_path.name} ({matches} seções)")

    print(f"\n🚀 Finalizado! {updated_files} arquivos atualizados, {total_matches} seções ajustadas.")

if __name__ == "__main__":
    fix_intro_typography()
