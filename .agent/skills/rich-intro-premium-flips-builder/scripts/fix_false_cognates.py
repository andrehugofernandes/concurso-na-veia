#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_false_cognates.py - Corrige props legadas em AulaFalseCognates.tsx
- modulo={N} -> numero={N}  (em ModuleBanner)
- corModulo={mv[N]} -> variant={mv[N]}  (em ModuleBanner)
- remove prop descricao= de AlertBox (mantendo o texto como children)
- converte ComparisonSide lado1/lado2 para estrutura Comparison correta
"""
import sys
import re
sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None

FILE = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaFalseCognates.tsx"

def fix_file():
    with open(FILE, encoding='utf-8', errors='replace') as f:
        content = f.read()

    original = content

    # 1. Fix: modulo={N} -> numero={N} in ModuleBanner context
    content = re.sub(r'\bmodulo=\{(\d+)\}', r'numero={\1}', content)

    # 2. Fix: corModulo={mv[N]} -> variant={mv[N]}
    content = content.replace('corModulo=', 'variant=')

    # 3. Fix: icone={<Lu...>} prop doesn't exist in ModuleBanner — remove it
    # ModuleBanner only accepts: numero, titulo, descricao, variant, gradiente
    content = re.sub(
        r'\s+icone=\{<Lu\w+ className="w-8 h-8" />\}',
        '',
        content
    )

    # 4. Fix AlertBox: move descricao= prop text to be the first child content
    # Pattern: <AlertBox tipo="..." titulo="..." descricao="..."> <ComparisonSide .../>
    # -> <AlertBox tipo="..." titulo="..."><p>...</p><ComparisonSide .../>
    def fix_alertbox(m):
        tipo = m.group(1)
        titulo = m.group(2)
        descricao = m.group(3)
        rest = m.group(4)
        return f'<AlertBox\n                        tipo="{tipo}"\n                        titulo="{titulo}"\n                      >\n                        <p className="text-lg mb-3">{descricao}</p>\n{rest}'

    content = re.sub(
        r'<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*>\s*(<ComparisonSide)',
        fix_alertbox,
        content,
        flags=re.DOTALL
    )

    # 5. Fix ComparisonSide lado1/lado2 -> Comparison left/right with correct props
    def fix_comparisonside(m):
        label1 = m.group(1)
        content1 = m.group(2)
        label2 = m.group(3)
        content2 = m.group(4)
        
        # Determine variant based on label
        var1 = "danger" if any(x in label1 for x in ["ERRADO", "Pegadinha", "Casual"]) else "info"
        var2 = "success" if any(x in label2 for x in ["CORRETO", "Correto", "Formal"]) else "info"
        
        return f'''<Comparison
                          title="Analise"
                          left={{{{
                            title: "{label1}",
                            content: "{content1}",
                            description: "Contexto",
                            variant: "{var1}",
                          }}}}
                          right={{{{
                            title: "{label2}",
                            content: "{content2}",
                            description: "Contexto",
                            variant: "{var2}",
                          }}}}
                        />'''

    content = re.sub(
        r'<ComparisonSide\s+lado1=\{\{ label: "([^"]+)", content: "([^"]+)" \}\}\s+lado2=\{\{ label: "([^"]+)", content: "([^"]+)" \}\}\s*/?>',
        fix_comparisonside,
        content
    )

    # 6. Fix missing titulo in QuizInterativo at line ~476
    # <QuizInterativo questoes={quizFinal} numero={2} onComplete={() => ...} />
    # should have titulo="QUIZ: Módulo Final"
    content = re.sub(
        r'(<QuizInterativo\s+questoes=\{quizFinal\}\s+numero=\{2\})',
        r'\1\n            titulo="QUIZ: Modulo Final — False Cognates"\n',
        content
    )

    if content == original:
        print("[INFO] Nenhuma mudanca necessaria.")
        return

    with open(FILE, encoding='utf-8', errors='replace') as f:
        pass  # verify readable

    with open(FILE, 'w', encoding='utf-8') as f:
        f.write(content)

    # Count changes
    import difflib
    diff = list(difflib.unified_diff(original.splitlines(), content.splitlines(), lineterm=''))
    added = sum(1 for l in diff if l.startswith('+') and not l.startswith('+++'))
    removed = sum(1 for l in diff if l.startswith('-') and not l.startswith('---'))
    print(f"[OK] Arquivo corrigido: +{added} linhas, -{removed} linhas")

if __name__ == "__main__":
    fix_file()
