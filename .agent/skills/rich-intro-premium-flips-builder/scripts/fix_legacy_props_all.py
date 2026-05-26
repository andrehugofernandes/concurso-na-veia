#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_legacy_props_all.py - Corrige props legadas em TODOS os arquivos Aula*.tsx de inglês:
1. modulo={N} -> numero={N}  (em ModuleBanner)
2. corModulo={...} -> variant={...}  (em ModuleBanner)
3. Remove prop icone= de ModuleBanner (não existe na interface atual)
4. AlertBox descricao="..." -> move para children <p>
5. ComparisonSide lado1/lado2 -> Comparison left/right
6. StepItem/TimelineItem numero= -> passo=
7. QuizInterativo sem titulo -> adiciona titulo padrão
"""
import sys
import re
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None

TARGET_DIR = Path(r"c:\Workspace\petrobras-quest\src\components\aulas\ingles")

def fix_content(content: str, filename: str) -> str:
    # 1. modulo={N} -> numero={N}
    content = re.sub(r'\bmodulo=\{(\d+)\}', r'numero={\1}', content)

    # 2. corModulo= -> variant=
    content = content.replace('corModulo=', 'variant=')

    # 3. Remove icone= prop from ModuleBanner (the icon is internal)
    content = re.sub(
        r'\s+icone=\{<Lu\w+[^}]*\s*/>\}',
        '',
        content
    )

    # 4. Fix AlertBox with descricao= prop (move to p child)
    # Pattern: <AlertBox tipo="X" titulo="Y" descricao="Z">
    # -> <AlertBox tipo="X" titulo="Y"><p className="...">Z</p>
    def fix_alertbox_descricao(m):
        indent = m.group(1)
        tipo = m.group(2)
        titulo = m.group(3)
        descricao = m.group(4)
        rest = m.group(5)
        return (
            f'{indent}<AlertBox\n'
            f'{indent}  tipo="{tipo}"\n'
            f'{indent}  titulo="{titulo}"\n'
            f'{indent}>\n'
            f'{indent}  <p className="text-base mb-3 text-foreground/80">{descricao}</p>\n'
            f'{rest}'
        )

    content = re.sub(
        r'( *)<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*>(\s*)',
        fix_alertbox_descricao,
        content
    )

    # Also handle AlertBox with no children (self-closing style via descricao only, no children)
    # <AlertBox tipo="X" titulo="Y" descricao="Z" /> -> convert to open tag with p child
    def fix_alertbox_self(m):
        indent = m.group(1)
        tipo = m.group(2)
        titulo = m.group(3)
        descricao = m.group(4)
        return (
            f'{indent}<AlertBox\n'
            f'{indent}  tipo="{tipo}"\n'
            f'{indent}  titulo="{titulo}"\n'
            f'{indent}>\n'
            f'{indent}  <p className="text-base text-foreground/80">{descricao}</p>\n'
            f'{indent}</AlertBox>'
        )

    content = re.sub(
        r'( *)<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*/?>',
        fix_alertbox_self,
        content
    )

    # 5. Fix ComparisonSide lado1/lado2 -> Comparison left/right
    def fix_comparisonside(m):
        indent = m.group(1)
        label1 = m.group(2)
        content1 = m.group(3)
        label2 = m.group(4)
        content2 = m.group(5)

        # Determine variant
        danger_keywords = ["ERRADO", "Pegadinha", "Casual", "Incorreto"]
        success_keywords = ["CORRETO", "Correto", "Formal", "Oficial"]
        var1 = "danger" if any(x in label1 for x in danger_keywords) else "info"
        var2 = "success" if any(x in label2 for x in success_keywords) else "info"

        # Escape single quotes in content
        c1 = content1.replace('"', '\\"')
        c2 = content2.replace('"', '\\"')

        return (
            f'{indent}<Comparison\n'
            f'{indent}  title="Analise Comparativa"\n'
            f'{indent}  left={{\n'
            f'{indent}    title: "{label1}",\n'
            f'{indent}    content: "{c1}",\n'
            f'{indent}    description: "Exemplo",\n'
            f'{indent}    variant: "{var1}",\n'
            f'{indent}  }}\n'
            f'{indent}  right={{\n'
            f'{indent}    title: "{label2}",\n'
            f'{indent}    content: "{c2}",\n'
            f'{indent}    description: "Exemplo",\n'
            f'{indent}    variant: "{var2}",\n'
            f'{indent}  }}\n'
            f'{indent}/>'
        )

    content = re.sub(
        r'( *)<ComparisonSide\s+lado1=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s+lado2=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s*/?>',
        fix_comparisonside,
        content
    )

    # 6. Fix StepItem/TimelineItem numero= -> passo=
    content = re.sub(r'(<(?:StepItem|TimelineItem)\s+)numero=', r'\1passo=', content)

    # 7. Fix QuizInterativo missing titulo prop
    # Look for QuizInterativo without titulo
    def add_quiz_titulo(m):
        tag_content = m.group(1)
        if 'titulo=' in tag_content:
            return m.group(0)  # already has titulo
        # Extract numero to make titulo
        num_match = re.search(r'numero=\{(\d+)\}', tag_content)
        num = num_match.group(1) if num_match else '?'
        return f'<QuizInterativo\n            titulo="QUIZ: Modulo {num}"\n{tag_content}'

    content = re.sub(
        r'<QuizInterativo\n((?:.*\n)*?.*?\/?>)',
        add_quiz_titulo,
        content
    )

    return content


def main():
    files = sorted(TARGET_DIR.glob("Aula*.tsx"))
    print(f"Processando {len(files)} arquivos...")

    for f in files:
        original = f.read_text(encoding='utf-8', errors='replace')
        fixed = fix_content(original, f.name)

        if fixed != original:
            f.write_text(fixed, encoding='utf-8')
            # Count changes
            orig_lines = original.splitlines()
            new_lines = fixed.splitlines()
            print(f"  [OK] {f.name}: {len(new_lines) - len(orig_lines):+d} linhas")
        else:
            print(f"  [--] {f.name}: sem mudancas")

    print("\nConcluido!")


if __name__ == "__main__":
    main()
