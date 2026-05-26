#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_text_comprehension.py - Corrige props legadas APENAS em AulaTextComprehension.tsx
Padrões corrigidos:
  1. modulo={N}         -> numero={N}         (ModuleBanner)
  2. corModulo={mv[N]}  -> variant={mv[N]}    (ModuleBanner)
  3. icone={<Lu...>}    -> removido           (ModuleBanner não aceita)
  4. AlertBox descricao="..." -> <p> child    (AlertBox não tem prop descricao)
  5. ComparisonSide lado1/lado2 -> Comparison left/right  (JSX duplas chaves)
  6. numero={N} em TimelineItem -> passo={N}  (interface correta)
  7. QuizInterativo sem titulo   -> adiciona titulo
"""
import sys
import re
sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None

FILE = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"

def fix(content: str) -> str:
    # 1. modulo={N} -> numero={N}
    content = re.sub(r'\bmodulo=\{(\d+)\}', r'numero={\1}', content)

    # 2. corModulo= -> variant=
    content = content.replace('corModulo=', 'variant=')

    # 3. Remove icone= prop from ModuleBanner
    content = re.sub(r'\s+icone=\{<Lu\w+[^}]*\s*/>\}', '', content)

    # 4. AlertBox: move descricao prop to <p> child (open tag with children)
    # Pattern: <AlertBox tipo="X" titulo="Y" descricao="Z">
    def alertbox_open(m):
        tipo = m.group(1)
        titulo = m.group(2)
        descricao = m.group(3)
        ws = m.group(4)
        indent = '                        '
        return (
            f'<AlertBox\n'
            f'{indent}tipo="{tipo}"\n'
            f'{indent}titulo="{titulo}"\n'
            f'{indent[:-2]}>\n'
            f'{indent}<p className="text-base mb-3 text-foreground/80">{descricao}</p>\n'
            f'{ws}'
        )
    content = re.sub(
        r'<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*>(\s*)',
        alertbox_open,
        content
    )

    # 4b. AlertBox self-closing (no children) with descricao only
    def alertbox_self(m):
        tipo = m.group(1)
        titulo = m.group(2)
        descricao = m.group(3)
        indent = '                        '
        return (
            f'<AlertBox\n'
            f'{indent}tipo="{tipo}"\n'
            f'{indent}titulo="{titulo}"\n'
            f'{indent[:-2]}>\n'
            f'{indent}<p className="text-base text-foreground/80">{descricao}</p>\n'
            f'{indent[:-2]}</AlertBox>'
        )
    content = re.sub(
        r'<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*/?>(?!\s*>)',
        alertbox_self,
        content
    )

    # 5. ComparisonSide lado1/lado2 -> Comparison with correct double-brace JSX syntax
    def fix_comparisonside(m):
        label1 = m.group(1)
        content1 = m.group(2).replace('"', '\\"')
        label2 = m.group(3)
        content2 = m.group(4).replace('"', '\\"')

        danger_kw = ["ERRADO", "Pegadinha", "Casual", "Incorreto", "ERRADA"]
        success_kw = ["CORRETO", "Correto", "Formal", "Oficial", "CORRETA"]
        var1 = "danger" if any(x in label1 for x in danger_kw) else "info"
        var2 = "success" if any(x in label2 for x in success_kw) else "info"

        indent = '                        '
        return (
            f'<Comparison\n'
            f'{indent}title="Analise Comparativa"\n'
            f'{indent}left={{{{\n'
            f'{indent}  title: "{label1}",\n'
            f'{indent}  content: "{content1}",\n'
            f'{indent}  description: "Exemplo",\n'
            f'{indent}  variant: "{var1}",\n'
            f'{indent}}}}}\n'
            f'{indent}right={{{{\n'
            f'{indent}  title: "{label2}",\n'
            f'{indent}  content: "{content2}",\n'
            f'{indent}  description: "Exemplo",\n'
            f'{indent}  variant: "{var2}",\n'
            f'{indent}}}}}\n'
            f'{indent[:-2]}/'
        )

    content = re.sub(
        r'<ComparisonSide\s+lado1=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s+'
        r'lado2=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s*/?>',
        fix_comparisonside,
        content
    )

    # 6. TimelineItem numero={N} -> passo={N}
    content = re.sub(
        r'(<TimelineItem\s[^>]*?)numero=\{(\d+)\}',
        r'\1passo={\2}',
        content
    )

    # 7. Add missing titulo to QuizInterativo
    def add_titulo(m):
        before = m.group(1)
        questoes = m.group(2)
        num_m = re.search(r'numero=\{(\d+)\}', before + m.group(0))
        num = num_m.group(1) if num_m else '?'
        if 'titulo=' in m.group(0):
            return m.group(0)
        return f'<QuizInterativo\n            titulo="QUIZ: Modulo {num}"\n            {questoes}'

    content = re.sub(
        r'<QuizInterativo\s*(questoes=\{[^}]+\})',
        add_titulo,
        content
    )

    # 8. Ensure Comparison is imported (replace ComparisonSide if present)
    if 'ComparisonSide,' in content:
        content = content.replace('  ComparisonSide,\n', '  Comparison,\n')
    elif 'Comparison,' not in content and 'ComparisonSide' not in content:
        content = content.replace('  TimelineItem,\n', '  TimelineItem,\n  Comparison,\n')

    return content


def main():
    original = open(FILE, encoding='utf-8', errors='replace').read()
    fixed = fix(original)

    if fixed == original:
        print("[INFO] Nenhuma mudanca necessaria.")
        return

    with open(FILE, 'w', encoding='utf-8') as f:
        f.write(fixed)

    orig_n = len(original.splitlines())
    new_n = len(fixed.splitlines())
    print(f"[OK] Corrigido: {new_n - orig_n:+d} linhas ({orig_n} -> {new_n})")


if __name__ == "__main__":
    main()
