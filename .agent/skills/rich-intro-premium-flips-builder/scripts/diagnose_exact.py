#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
diagnose_exact.py - Diagnostico preciso de modulos com intro incompleta.
"""
import sys
sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None
import re, os, sys
from pathlib import Path

TARGET_DIR = Path(r"c:\Workspace\petrobras-quest\src\components\aulas\ingles")
MIN_P = 5

def diagnose_file(path: Path):
    text = path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()

    # Localiza blocos TabsContent
    tab_pattern = re.compile(r'<TabsContent\s+value="([^"]+)"')
    intro_pattern = re.compile(r'index="INTRO"')
    p_pattern = re.compile(r'<p[>\s]')

    # Encontra posições dos TabsContent
    tabs = []
    for i, line in enumerate(lines):
        m = tab_pattern.search(line)
        if m:
            tabs.append((i, m.group(1)))

    if not tabs:
        return

    results = []
    for idx, (tab_start, tab_value) in enumerate(tabs):
        tab_end = tabs[idx + 1][0] if idx + 1 < len(tabs) else len(lines)
        tab_block = lines[tab_start:tab_end]

        # Localiza INTRO dentro deste tab
        intro_positions = []
        for j, line in enumerate(tab_block):
            if intro_pattern.search(line):
                intro_positions.append(j)

        for intro_rel in intro_positions:
            intro_abs = tab_start + intro_rel

            # Conta <p> nas próximas 100 linhas após INTRO (até próxima section ou tab)
            search_block = tab_block[intro_rel:intro_rel + 120]
            p_count = sum(1 for l in search_block if p_pattern.search(l))

            results.append({
                "tab": tab_value,
                "intro_line": intro_abs + 1,
                "p_count": p_count,
                "ok": p_count >= MIN_P
            })

    # So mostra os problematicos
    problems = [r for r in results if not r["ok"]]
    if problems:
        print(f"\n[ARQUIVO] {path.name}")
        for r in problems:
            status = "[FALTA]" if r["p_count"] < MIN_P else "[OK]"
            needed = max(0, MIN_P - r["p_count"])
            print(f"  {status} [{r['tab']}] linha {r['intro_line']}: {r['p_count']} <p> (faltam {needed})")
    else:
        print(f"  [OK] {path.name} -- todos os modulos OK")

def main():
    files = sorted(TARGET_DIR.glob("Aula*.tsx"))
    if not files:
        print("Nenhum arquivo encontrado.")
        return

    print(f"=== DIAGNOSTICO EXATO --- {len(files)} arquivos ===")
    for f in files:
        diagnose_file(f)
    print("\n=== FIM ===")

if __name__ == "__main__":
    main()
