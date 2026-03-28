import os
import re
from pathlib import Path

def upgrade_all_fonts():
    """
    Substitui tamanhos de fonte pequenos (xs, sm, base) por maiores (base, lg, lg)
    em todos os arquivos de aula, seguindo a solicitação de padronização para desktop.
    xs -> base
    sm -> lg
    base -> lg
    """
    target_dir = Path("src/components/aulas")
    
    # Padrões para substituição segura dentro de classNames
    # Usamos lookbehind/lookahead para garantir que pegamos apenas a classe exata
    # e não partes de outras strings.
    
    # 1. text-sm -> text-lg
    # 2. text-base -> text-lg (conforme pedido: "nenhum text-base, todos text-lg")
    # 3. text-xs -> text-base (conforme visto nos edits manuais do usuário)
    
    # Nota: A ordem importa. Se mudarmos xs para base primeiro, e depois base para lg, 
    # acabaremos com tudo lg. Mas o usuário mudou xs para base em alguns pontos críticos 
    # onde lg ficaria grande demais (ex: legendas de ícones).
    # Porém, o pedido textual diz "todos text-lg".
    # Vou seguir o pedido textual "todos text-lg" para sm/base e 
    # um "salto" para xs -> base para não quebrar o layout de mini-elementos, 
    # mas se o usuário quiser TUDO lg, o text-base resultante de xs 
    # seria contra o "nenhum text-base".
    
    # Re-lendo o pedido: "não fosse usado nenhum texto com tamanho de fonte text-xs ou text-sm ou text-base. Gostaria que ficassem todos text-lg."
    # OK, vou transformar TUDO (xs, sm, base) em text-lg para ser fiel ao comando, 
    # mas mantendo o text-xl das intros que já fizemos.
    
    replacements = [
        (r'\btext-xs\b', 'text-lg'),
        (r'\btext-sm\b', 'text-lg'),
        (r'\btext-base\b', 'text-lg'),
    ]

    updated_files = 0

    for file_path in target_dir.rglob("Aula*.tsx"):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        new_content = content
        for pattern, repl in replacements:
            new_content = re.sub(pattern, repl, new_content)
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            updated_files += 1
            print(f"✅ Fonte Upgrade: {file_path.name}")

    print(f"\n🚀 Finalizado! {updated_files} arquivos de aula padronizados com text-lg.")

if __name__ == "__main__":
    upgrade_all_fonts()
