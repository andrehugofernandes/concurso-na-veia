#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_textcomp_safe.py - Correções SEGURAS em AulaTextComprehension.tsx
Usa apenas substituições simples de string (sem regex complexo) para evitar
deletar conteúdo pedagógico por engano.
"""
import sys
sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None

FILE = r"c:\Workspace\petrobras-quest\src\components\aulas\ingles\AulaTextComprehension.tsx"

# Substituições simples e SEGURAS (sem regex, string exata)
SIMPLE_REPLACEMENTS = [
    # 1. modulo= -> numero= em ModuleBanner
    ('modulo={8}', 'numero={8}'),
    ('modulo={9}', 'numero={9}'),
    ('modulo={10}', 'numero={10}'),

    # 2. corModulo= -> variant=
    ('corModulo=', 'variant='),

    # 3. Remove icone= line (linha inteira)
    # Feito abaixo via filtragem de linhas

    # 4. StepItem/TimelineItem: numero= -> passo=
    # Feito abaixo via filtragem de linhas (contexto-aware)
]

def main():
    with open(FILE, encoding='utf-8', errors='replace') as f:
        lines = f.readlines()

    original_lines = lines[:]
    output = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Aplicar substituições simples
        for old, new in SIMPLE_REPLACEMENTS:
            if old in line:
                line = line.replace(old, new)

        # Remover linha de icone= em ModuleBanner (linha isolada com só icone=)
        stripped = line.strip()
        if stripped.startswith('icone={<Lu') and stripped.endswith('/>}'):
            i += 1
            continue

        # TimelineItem: trocar numero= por passo= (apenas quando dentro de TimelineItem)
        # Verifica contexto: linha anterior ou atual contém TimelineItem
        if 'TimelineItem' in line and 'numero=' in line:
            line = line.replace('numero=', 'passo=')
        elif (i > 0 and 'TimelineItem' in output[-1] if output else False) and 'numero=' in line:
            line = line.replace('numero=', 'passo=')

        # QuizInterativo sem titulo: detecta padrão e insere
        if '<QuizInterativo' in line and i + 1 < len(lines):
            # Olha as próximas 5 linhas para ver se há titulo=
            next_5 = ''.join(lines[i:i+6])
            if 'titulo=' not in next_5 and 'questoes=' in next_5:
                # Extrai numero para criar titulo descritivo
                import re
                num_match = re.search(r'numero=\{(\d+)\}', next_5)
                num = num_match.group(1) if num_match else '?'
                indent = len(line) - len(line.lstrip())
                titulo_line = ' ' * indent + f'  titulo="QUIZ: Módulo {num}"\n'
                output.append(line)
                output.append(titulo_line)
                i += 1
                continue

        output.append(line)
        i += 1

    # Agora fix AlertBox descricao= e ComparisonSide lado1/lado2
    # Abordagem: processar como texto completo com substituições de bloco
    content = ''.join(output)

    import re

    # AlertBox com descricao= e SEM children (self-closing ou com ComparisonSide filho)
    # Padrão: <AlertBox tipo="X" titulo="Y" descricao="Z"> \n <ComparisonSide .../>
    # -> <AlertBox tipo="X" titulo="Y"> \n <p>Z</p> \n <Comparison .../>
    def fix_alertbox_with_comparison(m):
        tipo = m.group(1)
        titulo = m.group(2)
        descricao = m.group(3)
        label1 = m.group(4)
        c1 = m.group(5).replace('"', '\\"')
        label2 = m.group(6)
        c2 = m.group(7).replace('"', '\\"')
        ws_before = m.group(8)  # whitespace before ComparisonSide

        danger_kw = ["ERRADO", "Pegadinha", "Incorreto", "Over-Inference", "Over-inference"]
        success_kw = ["CORRETO", "Correto", "Inferência V", "Infer\u00eancia V"]
        var1 = "danger" if any(x in label1 for x in danger_kw) else "success" if any(x in label1 for x in success_kw) else "info"
        var2 = "danger" if any(x in label2 for x in danger_kw) else "success" if any(x in label2 for x in success_kw) else "info"

        ind = ws_before
        return (
            f'<AlertBox\n'
            f'{ind}  tipo="{tipo}"\n'
            f'{ind}  titulo="{titulo}"\n'
            f'{ind}>\n'
            f'{ind}  <p className="text-base mb-3 text-foreground/80">{descricao}</p>\n'
            f'{ind}  <Comparison\n'
            f'{ind}    title="Analise Comparativa"\n'
            f'{ind}    left={{{{\n'
            f'{ind}      title: "{label1}",\n'
            f'{ind}      content: "{c1}",\n'
            f'{ind}      description: "Exemplo",\n'
            f'{ind}      variant: "{var1}",\n'
            f'{ind}    }}}}\n'
            f'{ind}    right={{{{\n'
            f'{ind}      title: "{label2}",\n'
            f'{ind}      content: "{c2}",\n'
            f'{ind}      description: "Exemplo",\n'
            f'{ind}      variant: "{var2}",\n'
            f'{ind}    }}}}\n'
            f'{ind}  />\n'
            f'{ind}</AlertBox>'
        )

    content = re.sub(
        r'<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*>\s*'
        r'(<ComparisonSide\s+lado1=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s+'
        r'lado2=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s*/?>)\s*'
        r'</AlertBox>',
        lambda m: fix_alertbox_with_comparison(re.match(
            r'<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*>\s*'
            r'<ComparisonSide\s+lado1=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s+'
            r'lado2=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}',
            m.group(0), re.DOTALL
        )) if re.match(
            r'<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*>\s*'
            r'<ComparisonSide\s+lado1=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}\s+'
            r'lado2=\{\{\s*label:\s*"([^"]+)",\s*content:\s*"([^"]+)"\s*\}\}',
            m.group(0), re.DOTALL
        ) else m.group(0),
        content,
        flags=re.DOTALL
    )

    # AlertBox self-closing com descricao= (sem children)
    def alertbox_self(m):
        tipo = m.group(1)
        titulo = m.group(2)
        descricao = m.group(3)
        return (
            f'<AlertBox\n'
            f'                        tipo="{tipo}"\n'
            f'                        titulo="{titulo}"\n'
            f'                      >\n'
            f'                        <p className="text-base text-foreground/80">{descricao}</p>\n'
            f'                      </AlertBox>'
        )
    content = re.sub(
        r'<AlertBox\s+tipo="([^"]+)"\s+titulo="([^"]+)"\s+descricao="([^"]+)"\s*/?>',
        alertbox_self,
        content
    )

    # Ensure Comparison is imported
    if 'ComparisonSide,' in content:
        content = content.replace('  ComparisonSide,\n', '  Comparison,\n')
    elif '  Comparison,' not in content:
        content = re.sub(
            r'(  TimelineItem,\n)',
            r'  TimelineItem,\n  Comparison,\n',
            content,
            count=1
        )

    if content == ''.join(original_lines):
        print("[INFO] Sem mudancas.")
        return

    with open(FILE, 'w', encoding='utf-8') as f:
        f.write(content)

    orig_n = len(original_lines)
    new_n = len(content.splitlines())
    print(f"[OK] Corrigido: {new_n - orig_n:+d} linhas ({orig_n} -> {new_n})")

if __name__ == '__main__':
    main()
